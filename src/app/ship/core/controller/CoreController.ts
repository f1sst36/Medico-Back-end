import { Router } from "express";
import { Request, Response } from "express";
import { validationResult } from "express-validator";

import { coreTransformer } from "../transformer/CoreTransformer";
import { errorFormatter } from "../../exceptions/errorFormatter";

export abstract class CoreController {
    public prefix: string = "";
    public router: Router | undefined = undefined;

    protected validateRequest = (
        req: Request,
        res: Response,
        message: String = "Ошибка валидации"
    ): Response | undefined => {
        const errors = validationResult(req).formatWith(errorFormatter);
        if (!errors.isEmpty())
            return res.status(400).json(coreTransformer.getErrorResponse(message, errors.array()));
    };

    protected validateFormDataRequest = (
        req: any,
        res: Response,
        validateMethod: Function
    ): Response | undefined => {
        const validateFormDataResult = validateMethod(req.body, req.files);
        if (Array.isArray(validateFormDataResult))
            return res
                .status(400)
                .json(coreTransformer.getErrorResponse("Ошибка валидации", validateFormDataResult));
    };
}
