import path from "path";

import express from "express";
import { Response } from "express";
import { Application } from "express";
import "dotenv/config";

import { Sequelize } from "sequelize";

import { swaggerDocs } from "./swagger";
import swaggerUi from "swagger-ui-express";

import fileUpload from "express-fileupload";

import { Patient } from "../containers/patient/models/Patient";
import { Doctor, DoctorSpecialtiesLink, Specialties } from "../containers/doctor/models";
import { User } from "../containers/user/models/User";
import { Seeder } from "./database/seeders";

export class App {
    public app: Application;
    public port: number;
    public sequelize: Sequelize;

    constructor(appInit: {
        port: number;
        prefix: string;
        middlewares: any;
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

        // force: true - удалит все таблицы и накатит заново
        this.sequelize.sync({ force: true });

        // seed
        // Seeder.run();
    }

    private initMiddlewares(middlewares: Array<any>) {
        this.app.use(express.json());
        this.app.use(
            fileUpload({
                useTempFiles: false,
                tempFileDir: `${path.dirname(__filename)}/storage/tempImages/`,
                safeFileNames: true,
                preserveExtension: true,
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
        this.app.get("/storage/images/:imageName", (req, res: Response) =>
            res.sendFile(path.join(__dirname, `./storage/images/${req.params.imageName}`))
        );

        // Роут для запуска сидов
        this.app.get("/seeder/run", (_, res: Response) => {
            Seeder.run();
            res.redirect(process.env.BACK_APP_URL);
        });
    }

    private initDataBaseConnection() {
        this.sequelize = new Sequelize({
            database: process.env.DB_NAME,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            host: process.env.DB_HOST,
            dialect: "postgres",

            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false,
                },
            },
        });

        // this.sequelize = new Sequelize(process.env.DATABASE_URL);
    }

    private initModels(models: Array<{ model: any; schema: object; tableName: string }>) {
        const sequelize = this.sequelize;
        models.forEach((model) => {
            model.model.init(model.schema, { tableName: model.tableName, sequelize });
        });

        // Relationships
        Patient.hasOne(User, { as: "user", foreignKey: "id", constraints: false });
        Doctor.hasOne(User, { as: "user", foreignKey: "id", constraints: false });

        DoctorSpecialtiesLink.belongsTo(Doctor, {
            as: "doctor",
            foreignKey: "doctorId",
        });
        DoctorSpecialtiesLink.belongsTo(Specialties, {
            as: "specialty",
            foreignKey: "specialtyId",
        });
    }

    private initSwagger() {
        this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App is working on the port ${this.port}`);
            console.log("DATABASE_URL", process.env.DATABASE_URL);
        });
    }
}
