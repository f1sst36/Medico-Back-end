const Validator = require('express-validator');

export const oldReviewsValidator = [
    Validator.query('reviewId', 'Необходимо указать id отзыва')
        .trim()
        .isInt({
            min: 1,
        })
        .withMessage('Параметр должен быть числом'),
    Validator.query('doctorId', 'Необходимо указать id доктора')
        .trim()
        .isInt({
            min: 1,
        })
        .withMessage('Параметр должен быть числом'),
    Validator.query('count', 'Необходимо указать количество отзывов')
        .trim()
        .isInt({
            min: 1,
        })
        .withMessage('Параметр должен быть числом'),
];
