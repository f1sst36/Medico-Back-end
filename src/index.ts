import { App } from "./app/app";
import "dotenv/config";

import { AuthController } from "./app/containers/common/controllers/auth/AuthController"

const app = new App({
    port: +process.env.PORT || 8080,
    controllers: [new AuthController],
    middlewares: [],
});

app.listen();
