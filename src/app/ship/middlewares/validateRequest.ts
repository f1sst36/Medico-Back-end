import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

import { tokenTransformer } from "../../containers/authorization/transformers/TokenTransformer";
import { errorFormatter } from "../exceptions/errorFormatter";

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req).formatWith(errorFormatter);
    console.log("validateRequest", errors)
    if (!errors.isEmpty())
        return res
            .status(400)
            .json(tokenTransformer.getErrorResponse("Ошибка валидации из мидлвара", errors.array()));
    return next();
};
