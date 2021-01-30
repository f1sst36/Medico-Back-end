import { App } from "./app/ship/app";
import "dotenv/config";

import { verifyJWTToken } from "./app/ship/middlewares/verifyJWTToken";

import { AuthController } from "./app/containers/authorization/controllers/auth/AuthController";

import { User, userSchema } from "./app/containers/authorization/models/User";
import { allowCrossDomain } from "./app/ship/middlewares/allowCrossDomain";
import { jsonErrorHandler } from "./app/ship/middlewares/jsonErrorHandler";

const app = new App({
    port: +process.env.PORT || 8080,
    prefix: "/api/v1",
    controllers: [new AuthController()],
    // middlewares: [allowCrossDomain, verifyJWTToken, jsonErrorHandler],
    middlewares: [allowCrossDomain, jsonErrorHandler],
    models: [
        {
            model: User,
            schema: userSchema,
            tableName: "Users",
        },
    ],
});

app.listen();
