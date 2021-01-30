import { Router } from "express";
import { Request, Response } from "express";
import { validationResult } from "express-validator";

import { coreTransformer } from "../transformer/CoreTransformer";
import { errorFormatter } from "../../exceptions/errorFormatter";

export abstract class CoreController {
    public prefix: string = "";
    public router: Router | undefined = undefined;

    protected validateRequest = (req: Request, res: Response): Response | undefined => {
        const errors = validationResult(req).formatWith(errorFormatter);
        if (!errors.isEmpty())
            return res
                .status(400)
                .json(coreTransformer.getErrorResponse("Ошибка валидации", errors.array()));
    };
}
