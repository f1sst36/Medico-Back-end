const Validator = require('express-validator');

export const consultationsForCurrentPatientValidator = [
    Validator.query('consultationState', 'Необходимо указать состояние консультации')
        .isIn(['waiting', 'done'])
        .withMessage("Состояние может иметь только 2 значения: 'waiting' и 'done'"),
];
