import { Response, NextFunction } from 'express';

const prefix = '/api/v1';
const patientUrls = [
    prefix + '/consultation/appointment/free-doctor-time',
    prefix + '/doctor/review/leave',
    prefix + '/patient/profile/questionnaire',
];

const doctorUrls = [prefix + '/doctor/profile/questionnaire'];

export const permissionByRole = (req: any, res: Response, next: NextFunction) => {
    if (!req.user) return next();
    
    if (req.user.user.userType === 'doctor') {
        for (let i = 0; i < doctorUrls.length; i++)
            if (req.url.indexOf(doctorUrls[i]) !== -1) return next();
    } else if (req.user.user.userType === 'patient') {
        for (let i = 0; i < patientUrls.length; i++)
            if (req.url.indexOf(patientUrls[i]) !== -1) return next();
    }

    return res
        .status(403)
        .send({ error: 1, data: null, message: 'У вашей роли нет доступа к данному методу' });
};
