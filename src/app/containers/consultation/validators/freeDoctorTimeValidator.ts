const Validator = require('express-validator');

export const freeDoctorTimeValidator = [
    Validator.query('doctorId', 'Неободимо указать id доктора')
        .trim()
        .isInt({ min: 1 })
        .withMessage('id доктора должно быть больше нуля'),
    Validator.query('date', 'Неободимо указать дату планируемой консультации')
        .trim()
        .isISO8601()
        // .matches(/(\+03)$/)
        .withMessage('Неверный формат даты'),
];
