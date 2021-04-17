const Validator = require('express-validator');

export const freeDoctorTimeValidator = [
    Validator.query('doctorId', 'Неободимо указать id доктора')
        .isInt({ min: 1 })
        .withMessage('id доктора должно быть больше нуля'),
    Validator.query('date', 'Неободимо указать дату планируемой консультации')
        .isISO8601()
        .withMessage('Неверный формат даты'),
];
