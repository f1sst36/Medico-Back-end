const Validator = require('express-validator');

export const patientInfoForConsultationValidator = [
    Validator.query('patientId', 'Необходимо укзаать id пациента')
        .trim()
        .isInt({
            min: 1,
        })
        .withMessage('id пациента должно быть числом'),
    Validator.query('consultationId', 'Необходимо укзаать id консультации')
        .trim()
        .isInt({
            min: 1,
        })
        .withMessage('id консультации должно быть числом'),
];
