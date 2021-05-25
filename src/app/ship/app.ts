import path from 'path';
import fs from 'fs';

import express from 'express';
import { Response } from 'express';
import { Application } from 'express';
import 'dotenv/config';

import { Sequelize } from 'sequelize';

import { swaggerOptions } from './swagger';
import swaggerUi from 'swagger-ui-express';

import fileUpload from 'express-fileupload';

import { createBullBoard } from 'bull-board';
import { BullAdapter } from 'bull-board/bullAdapter';

import { Seeder } from './database/seeders';
import { linkModels } from './database/relationships';
import { checkConsultationState } from '../containers/consultation/schedules/CheckConsultationState';
import { socketConnection } from './socket-io/SocketConnection';

export class App {
    public app: Application;
    public port: number;
    public server: any;
    public sequelize: Sequelize;
    public io: SocketIO.Server;

    constructor(appInit: {
        port: number;
        prefix: string;
        middlewares: any;
        queues: Array<any>;
        controllers: any;
        models: any;
    }) {
        this.app = express();
        this.port = appInit.port;

        this.initMiddlewares(appInit.middlewares);
        this.initRoutes(appInit.controllers, appInit.prefix);
        this.initSwagger();

        this.initDataBaseConnection();
        this.initModels(appInit.models);

        this.initSchedules();

        this.initQueues(appInit.queues);

        this.server = require('http').createServer(this.app);

        // force: true - удалит все таблицы и накатит заново
        this.sequelize.sync({ force: false });
    }

    private initMiddlewares(middlewares: Array<any>) {
        this.app.use(express.json());
        this.app.use(
            fileUpload({
                useTempFiles: false,
                tempFileDir: `${path.dirname(__filename)}/storage/tempFiles/`,
                safeFileNames: true,
                preserveExtension: true,
                limits: { fileSize: 50 * 1024 * 1024 },
            })
        );

        // this.app.use(express.urlencoded({ extended: false }));
        middlewares.forEach((middleware) => {
            this.app.use(middleware);
        });
    }

    private initRoutes(controllers: Array<any>, prefix: string) {
        controllers.forEach((controller) => {
            this.app.use(prefix, controller.router);
        });

        // Роут для получения изображений
        this.app.get('/storage/files/:fileName', (req, res: Response) =>
            res.sendFile(path.join(__dirname, `./storage/files/${req.params.fileName}`))
        );

        // Роут для запуска сидов
        this.app.get('/seeder/run', (_, res: Response) => {
            Seeder.run(this.sequelize);
            res.send(`<span>Success</span>`);
        });

        this.app.get('/', (_, res: Response) => {
            return res.send(`
                <a href="/api-docs">Swagger</a>
                <a href="${process.env.FRONT_APP_URL}">Front-end application</a>
                <a href="/seeder/run">Start seeding</a>
            `);
        });

        this.app.get('/swagger', (_, res: Response) => {
            return res.json(swaggerOptions);
        });

        this.app.get('/docs', (_, res: Response) => {
            const html = fs.readFileSync(path.join(__dirname, './swagger/index.html'), {
                encoding: 'utf-8',
            });
            return res.send(html);
        });

        // this.app.use(express.static(path.join(__dirname, './public')));

        this.app.get('/chat', (_, res: Response) => {
            const html = fs.readFileSync(path.join(__dirname, './public/index.html'), {
                encoding: 'utf-8',
            });
            return res.send(html);
        });
    }

    private initDataBaseConnection() {
        this.sequelize = new Sequelize({
            database: process.env.DB_NAME,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            host: process.env.DB_HOST,
            dialect: 'postgres',

            // logging: false,

            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false,
                },
            },

            // timezone: '+03:00',
        });
    }

    private initModels(models: Array<{ model: any; schema: object; tableName: string }>) {
        const sequelize = this.sequelize;
        models.forEach((model) => {
            model.model.init(model.schema, { tableName: model.tableName, sequelize });
        });

        // Relationships
        linkModels();
    }

    private async initSchedules() {
        await checkConsultationState.run();
    }

    private initSocket() {
        this.io = require('socket.io')(this.server, {
            cors: true,
            origins: [process.env.FRONT_APP_URL],
        });
        socketConnection.init(this.io);
    }

    private initQueues(queues: Array<any>) {
        const bullAdapters: Array<any> = [];
        for (let i = 0; i < queues.length; i++) {
            const queue = queues[i].run();
            bullAdapters.push(new BullAdapter(queue));
        }

        const { router } = createBullBoard(bullAdapters);

        this.app.use('/admin/bull', router);
    }

    private initSwagger() {
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOptions));
    }

    public listen() {
        this.server.listen(this.port, () => {
            console.log(`App is working on the port ${this.port}`);
            this.initSocket();
        });
    }
}
