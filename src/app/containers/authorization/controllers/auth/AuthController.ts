import express from "express";
import { Request, Response } from "express";

import { CoreController } from "../../../../ship/core/controller/CoreController";
import { registrationValidator, loginValidator } from "../../validators";
import { loginAction, registrationAction, confirmationAccountAction } from "../../actions";
import { tokenTransformer } from "../../transformers/TokenTransformer";
import { sendEmailWithActivationTokenAction } from "../../actions/SendEmailWithActivationTokenAction";
import { sendEmailValidator } from "../../validators/sendEmailValidator";

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
        this.router.get(this.prefix + "/confirmation-account", this.confirmationAccount);
        this.router.post(this.prefix + "/send-email-with-token", sendEmailValidator, this.sendEmailWithActivationToken);
    }

    public login = async (req: Request, res: Response): Promise<Response> => {
        if (this.validateRequest(req, res, "Неверный логин или пароль")) return;

        const result = await loginAction.run(req);

        let response;
        let statusCode = 200;
        if (!result.error) response = tokenTransformer.transform(result.data);
        else {
            statusCode = 422;
            response = tokenTransformer.getErrorResponse(result.message);
        }

        return res.status(statusCode).json(response);
    };

    public registration = async (req: Request, res: Response): Promise<Response> => {
        if (this.validateRequest(req, res)) return;

        const result = await registrationAction.run(req);

        if (!result.error)
            return res.status(200).json(tokenTransformer.getSimpleSuccessResponse(result.message));
        return res.status(422).json(tokenTransformer.getErrorResponse(result.message));
    };

    public confirmationAccount = async (req: Request, res: Response): Promise<any> => {
        if (!req.query.token)
            return res
                .status(404)
                .json(tokenTransformer.getErrorResponse("Токен подтверждения не найден"));

        const result = await confirmationAccountAction.run(req.query.token);

        if (!result.error) return res.redirect(process.env.FRONT_APP_URL + "/sign-up-confirmation");
        else {
            if (result.error === 2) return res.redirect(process.env.FRONT_APP_URL);

            // иначе редирект на фронт, но с модалкой типо "не удалось подтвердить аккаунт"
            return res.status(422).json(tokenTransformer.getErrorResponse(result.message));
        }
    };

    public sendEmailWithActivationToken = async (req: Request, res: Response) => {
        if (this.validateRequest(req, res)) return;

        const result = await sendEmailWithActivationTokenAction.run(req.body.email);

        if (!result.error)
            return res.status(200).json(tokenTransformer.getSimpleSuccessResponse(result.message));
        return res.status(422).json(tokenTransformer.getErrorResponse(result.message));
    };

    public logout = (req: Request, res: Response): void => {
        // ...
    };
}
