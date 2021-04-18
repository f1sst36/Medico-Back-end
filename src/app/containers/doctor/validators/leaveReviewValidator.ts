const Validator = require('express-validator');

export const leaveReviewValidator = [
    Validator.body('doctorId', 'Необходимо указать id доктора')
        .isInt({
            min: 1,
        })
        .withMessage('id доктора должно быть числом больше нуля'),
    Validator.body('text', 'Необходимо написать текст отзыва')
        .isLength({
            min: 10,
            max: 2000,
        })
        .withMessage('Длина отзыва должна быть от 10 до 2000 символов'),
    Validator.body('estimation', 'Необходимо указать оценку')
        .isInt({
            min: 1,
            max: 5,
        })
        .withMessage('Оценка это целое число от 1 до 5'),
];
