const Validator = require('express-validator');

export const changeDoctorsInfoValidator = [
    Validator.body('costOfConsultation')
        .optional()
        .isInt({
            min: 300,
            max: 100000,
        })
        .withMessage('Сумма консультации должна быть в диапозоне от 300 до 100 000 рублей'),
    Validator.body('about')
        .optional()
        .isLength({
            max: 30000,
        })
        .withMessage('Информация о себе должна быть до 30 000 символов'),
    Validator.body('education')
        .optional()
        .isLength({
            min: 0,
            max: 500,
        })
        .withMessage('Может быть до 500 мест образования'),
    Validator.body('workplaces')
        .optional()
        .isLength({
            min: 0,
            max: 500,
        })
        .withMessage('Может быть до 500 мест работы'),
];
