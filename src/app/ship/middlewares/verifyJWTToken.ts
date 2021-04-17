import jwt from 'jsonwebtoken';

import { Response, NextFunction } from 'express';

const prefix = '/api/v1';
const exceptUrls = [
    '/api-docs',
    prefix + '/auth/sign-in',
    prefix + '/auth/sign-up',
    prefix + '/auth/confirmation-account',
    prefix + '/auth/send-email-with-token',
    prefix + '/doctor/specialties',
    prefix + '/doctor/paginate',
    prefix + '/doctor/info',
    prefix + '/doctor/unverified',
    prefix + '/doctor/most-experienced',
    prefix + '/doctor/review/list',
];

export const verifyJWTToken = (req, res: Response, next: NextFunction) => {
    if (req.url.indexOf(prefix) === -1) return next();

    for (let i = 0; i < exceptUrls.length; i++)
        if (req.url.indexOf(exceptUrls[i]) !== -1) return next();

    const accessToken = req.header('accessToken');
    if (!accessToken) return res.status(401).send({ error: 1, message: 'Access denied' });

    try {
        const verified = jwt.verify(accessToken, process.env.TOKEN_SECRET_KEY);
        req.user = verified._user;

        // проверка на isActivated происходит во время логина (входа)

        next();
    } catch (err) {
        return res.status(400).send({ error: 1, message: 'Invalid token' });
    }
};
