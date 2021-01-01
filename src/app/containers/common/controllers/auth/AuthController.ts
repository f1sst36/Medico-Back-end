import express from "express";
import { Request, Response } from "express";

import { CoreController } from "../../../../core/controller/CoreController";
import { User } from "../../models/user/User";

import { IAuthController } from "./IAuthController";

export class AuthController extends CoreController implements IAuthController {
    public router = express.Router();

    constructor() {
        super();
        this.prefix = "/auth";
        this.initRoutes();
    }

    public initRoutes() {
        this.router.get(this.prefix + "/sign-in", this.login);
    }

    login = async (_: Request, res: Response): Promise<void> => {
        const users = await User.findAll();
        users[0].getSomeData();
        res.send(users);
    };

    logout = (req: Request, res: Response): void => {
        // ...
    };
}
