const Validator = require('express-validator');

export const consultationsForCurrentPatientValidator = [
    Validator.query('consultationState', 'Необходимо указать состояние консультации')
        .isIn(['waiting', 'done', 'active'])
        .withMessage("Состояние может иметь только 3 значения: 'waiting', 'done' и 'active'"),
];
