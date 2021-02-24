import jwt from "jsonwebtoken";

import { Response, NextFunction } from "express";

const prefix = "/api/v1";
const exceptUrls = [
    "/api-docs",
    prefix + "/auth/sign-in",
    prefix + "/auth/sign-up",
    prefix + "/auth/confirmation-account",
    prefix + "/doctor/specialties",
];

export const verifyJWTToken = (req, res: Response, next: NextFunction) => {
    for (let i = 0; i < exceptUrls.length; i++)
        if (req.url.indexOf(exceptUrls[i]) !== -1) return next();

    const accessToken = req.header("accessToken");
    if (!accessToken) return res.status(401).send({ error: 1, message: "Access denied" });

    try {
        const verified = jwt.verify(accessToken, process.env.TOKEN_SECRET_KEY);
        req.user = verified._user;
        // console.log(req);

        // проверка на isActivated происходит во время логина (входа)
        // if (!req.user.isActivated)
        //     return {
        //         error: 1,
        //         message: "Аккаунт не активирован",
        //     };

        next();
    } catch (err) {
        return res.status(400).send({ error: 1, message: "Invalid token" });
    }
};
