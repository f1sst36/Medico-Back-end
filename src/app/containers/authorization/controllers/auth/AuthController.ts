import express from "express";
import { Request, Response } from "express";
import { validationResult } from "express-validator";

import { errorFormatter } from "../../../../ship/exceptions/errorFormatter";
import { CoreController } from "../../../../ship/core/controller/CoreController";
import { registrationValidator, loginValidator } from "../../validators";
import { loginAction, registrationAction } from "../../actions";
import { tokenTransformer } from "../../transformers/TokenTransformer";

export class AuthController extends CoreController {
    constructor() {
        super();
        this.prefix = "/auth";
        this.router = express.Router();
        this.initRoutes();
    }

    public initRoutes() {
        this.router.post(this.prefix + "/sign-in", loginValidator, this.login);
        this.router.post(this.prefix + "/sign-up", registrationValidator, this.registration);
    }

    login = async (req: Request, res: Response): Promise<Response> => {
        const errors = validationResult(req).formatWith(errorFormatter);
        if (!errors.isEmpty())
            return res
                .status(400)
                .json(tokenTransformer.getErrorResponse("Ошибка валидации", errors.array()));

        const result = await loginAction.run(req);

        let response;
        let statusCode = 200;
        if (!result.error) response = tokenTransformer.transform(result.data);
        else {
            statusCode = 400;
            response = tokenTransformer.getErrorResponse(result.message);
        }

        return res.status(statusCode).json(response);
    };

    registration = async (req: Request, res: Response): Promise<Response> => {
        const errors = validationResult(req).formatWith(errorFormatter);
        if (!errors.isEmpty())
            return res
                .status(400)
                .json(tokenTransformer.getErrorResponse("Ошибка валидации", errors.array()));

        const result = await registrationAction.run(req);

        if (!result.error) {
            return res.status(200).json(tokenTransformer.getSimpleSuccessResponse(result.message));
        } else {
            return res.status(400).json(tokenTransformer.getErrorResponse(result.message));
        }
    };

    logout = (req: Request, res: Response): void => {
        // ...
    };
}
