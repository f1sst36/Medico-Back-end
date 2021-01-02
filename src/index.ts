import { App } from "./app/ship/app";
import "dotenv/config";

import { AuthController } from "./app/containers/authorization/controllers/auth/AuthController";

import { User, userSchema } from "./app/containers/authorization/models/User";

const app = new App({
    port: +process.env.PORT || 8080,
    controllers: [new AuthController()],
    middlewares: [],
    models: [
        {
            model: User,
            schema: userSchema,
            tableName: "Users",
        },
    ],
});

app.listen();
