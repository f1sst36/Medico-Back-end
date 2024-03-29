const Validator = require('express-validator');

export const doctorsPaginateValidator = [
    Validator.query('page', 'Необходимо указать страницу')
        .trim()
        .isInt({
            min: 1,
        })
        .withMessage('Параметр должен быть числом'),
    Validator.query('count', 'Необходимо указать количество элементов')
        .trim()
        .isInt({
            min: 1,
        })
        .withMessage('Параметр должен быть числом'),
    Validator.query('fio').trim().isString().withMessage('Параметр должен быть строкой'),
    Validator.query('specialty').trim().isString().withMessage('Параметр должен быть строкой'),
];
