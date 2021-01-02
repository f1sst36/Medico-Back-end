import express from "express";
import { Application } from "express";
import "dotenv/config";

import { Sequelize } from "sequelize";

import { swaggerDocs } from "./swagger";
import swaggerUi from "swagger-ui-express";

export class App {
    public app: Application;
    public port: number;
    public sequelize: any;

    constructor(appInit: { port: number; middlewares: any; controllers: any; models: any }) {
        this.app = express();
        this.port = appInit.port;

        this.initMiddlewares(appInit.middlewares);
        this.initRoutes(appInit.controllers);
        this.initSwagger();

        this.initDataBaseConnection();
        this.initModels(appInit.models);
        this.sequelize.sync({ force: false });
    }

    private initMiddlewares(middlewares: Array<any>) {
        middlewares.forEach((middleware) => {
            this.app.use(middleware);
        });
    }

    private initRoutes(controllers: Array<any>) {
        controllers.forEach((controller) => {
            this.app.use("/", controller.router);
        });
    }

    private initDataBaseConnection() {
        this.sequelize = new Sequelize(
            process.env.DB_NAME,
            process.env.DB_USERNAME,
            process.env.DB_PASSWORD,
            {
                host: process.env.DB_HOST,
                dialect: "postgres",
            }
        );
    }

    private initModels(models: Array<{ model: any; schema: object; tableName: string }>) {
        const sequelize = this.sequelize;
        models.forEach((model) => {
            model.model.init(model.schema, { tableName: model.tableName, sequelize });
        });
    }

    private initSwagger() {
        this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App is working on the port ${this.port}`);
        });
    }
}
