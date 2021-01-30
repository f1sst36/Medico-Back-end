import jwt from "jsonwebtoken";

import { Response, NextFunction } from "express";

export const verifyJWTToken = (req, res: Response, next: NextFunction) => {
    const accessToken = req.header("accessToken");
    if (!accessToken) return res.status(401).send({ errors: { message: "Access denied" } });

    try {
        const verified = jwt.verify(accessToken, process.env.TOKEN_SECRET_KEY);
        req.user = verified._user;
        next();
    } catch (err) {
        return res.status(400).send({ errors: { message: "Invalid token" } });
    }
};
