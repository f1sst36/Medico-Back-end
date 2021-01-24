import { Request, Response, NextFunction } from "express";

export const allowCrossDomain = function (req: Request, res: Response, next: NextFunction) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "*");

    if (req.method === "OPTIONS") {
        res.sendStatus(200);
    } else {
        next();
    }
};
