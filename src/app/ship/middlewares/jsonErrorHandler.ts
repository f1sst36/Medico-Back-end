import { Request, Response, NextFunction } from "express";

import { coreTransformer } from "../core/transformer/CoreTransformer";

export const jsonErrorHandler = async (err, req: Request, res: Response, next: NextFunction) => {
    res.status(err.statusCode).send(
        coreTransformer.getErrorResponse("Unknown error", {
            body: err.body,
            type: err.type,
        })
    );
};
