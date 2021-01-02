import path from "path";
import swaggerJsDoc from "swagger-jsdoc";

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            version: "1.0.0",
            title: "Medico API",
            description: "API Information\n[ Base URL: /api/v1 ]",
            contact: {
                name: "F1sst",
            },
            servers: ["http://localhost:8080"],
        },
        schemes: ["http", "https"],
        securityDefinitions: {
            Bearer: {
                type: "apiKey",
                name: "Authorization",
                in: "header",
            },
        },
    },
    apis: [path.resolve("./src/app/containers/*/controllers/docs.ts")],
};

export const swaggerDocs = swaggerJsDoc(swaggerOptions);
