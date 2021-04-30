import { Response, NextFunction } from 'express';

const prefix = '/api/v1';

// Урлы доступные авторизованому пациенту после прохождения анкеты
const patientUrls = [
    prefix + '/user/info',
    prefix + '/user/fresh-token',
    prefix + '/user/change-user-info',
    prefix + '/consultation/appointment/free-doctor-time',
    prefix + '/consultation/appointment/meta-info',
    prefix + '/consultation/appointment/create',
    prefix + '/doctor/review/leave',
    prefix + '/consultation/doctors-for-patient',
    prefix + '/consultation/cancel',
    prefix + '/consultation/appointments',
    prefix + '/patient/analysis/all',
    prefix + '/patient/analysis/append',
    prefix + '/patient/profile/change-medical-card',
];

// Урлы доступные авторизованному пациенту без пройденной анкеты
const patientUrlsWithoutQuestionnaire = [
    prefix + '/user/info',
    prefix + '/user/fresh-token',
    prefix + '/patient/profile/questionnaire',
];

// Урлы доступные авторизованному доктору после прохождения анкеты и верефицирования
const doctorUrls = [
    prefix + '/user/info',
    prefix + '/user/fresh-token',
    prefix + '/user/change-user-info',
    prefix + '/consultation/cancel',
    prefix + '/consultation/patients-for-doctor',
];

// Урлы доступные авторизованому доктору без пройденной анкеты и верефицирования
const doctorUrlsWithoutQuestionnaire = [
    prefix + '/user/info',
    prefix + '/user/fresh-token',
    prefix + '/doctor/profile/questionnaire',
];

export const permissionByRole = (req: any, res: Response, next: NextFunction) => {
    if (!req.user) return next();

    if (req.user.user.userType === 'doctor') {
        if (req.user.isVerified) {
            for (let i = 0; i < doctorUrls.length; i++)
                if (req.url.indexOf(doctorUrls[i]) !== -1) return next();
        } else {
            for (let i = 0; i < doctorUrlsWithoutQuestionnaire.length; i++)
                if (req.url.indexOf(doctorUrlsWithoutQuestionnaire[i]) !== -1) return next();
        }
    } else if (req.user.user.userType === 'patient') {
        if (req.user.isFullData) {
            for (let i = 0; i < patientUrls.length; i++)
                if (req.url.indexOf(patientUrls[i]) !== -1) return next();
        } else {
            for (let i = 0; i < patientUrlsWithoutQuestionnaire.length; i++)
                if (req.url.indexOf(patientUrlsWithoutQuestionnaire[i]) !== -1) return next();
        }
    }

    return res.status(403).send({ error: 1, data: null, message: 'Нет доступа к данному методу' });
};
