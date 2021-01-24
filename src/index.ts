import { App } from "./app/ship/app";
import "dotenv/config";

import { verifyJWTToken } from "./app/ship/middlewares/verifyJWTToken";

import { AuthController } from "./app/containers/authorization/controllers/auth/AuthController";

import { User, userSchema } from "./app/containers/authorization/models/User";
import { allowCrossDomain } from "./app/ship/middlewares/allowCrossDomain";

const app = new App({
    port: +process.env.PORT || 8080,
    prefix: "/api/v1",
    controllers: [new AuthController()],
    // middlewares: [allowCrossDomain, verifyJWTToken],
    middlewares: [allowCrossDomain],
    models: [
        {
            model: User,
            schema: userSchema,
            tableName: "Users",
        },
    ],
});

app.listen();
