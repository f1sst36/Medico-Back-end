import { App } from "./app/ship/app";
import "dotenv/config";

import { AuthController } from "./app/containers/authorization/controllers/auth/AuthController";
import { ProfileController } from "./app/containers/pacient/constollers/profile/ProfileController";

import { User, userSchema } from "./app/containers/user/models/User";
import { Pacient, pacientSchema } from "./app/containers/pacient/models/Pacient";
import { Doctor, doctorSchema } from "./app/containers/doctor/models/Doctor";
import {
    jsonErrorHandler,
    allowCrossDomain,
    verifyJWTToken,
} from "./app/ship/middlewares";

const app = new App({
    port: +process.env.PORT || 8080,
    prefix: "/api/v1",
    controllers: [new AuthController(), new ProfileController()],
    middlewares: [allowCrossDomain, verifyJWTToken, jsonErrorHandler],
    models: [
        {
            model: User,
            schema: userSchema,
            tableName: "Users",
        },
        {
            model: Pacient,
            schema: pacientSchema,
            tableName: "Pacients",
        },
        {
            model: Doctor,
            schema: doctorSchema,
            tableName: "Doctors",
        },
    ],
});

app.listen();
