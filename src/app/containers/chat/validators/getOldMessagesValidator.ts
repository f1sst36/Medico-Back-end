const Validator = require('express-validator');

export const getOldMessagesValidator = [
    Validator.query('chatId', 'Необходимо указать id чата')
        .trim()
        .isInt({
            min: 1,
        })
        .withMessage('id чата должно быть больше нуля'),
    Validator.query('count', 'Необходимо указать количество сообщений')
        .trim()
        .isInt({
            min: 1,
            max: 200,
        })
        .withMessage('Количество сообщений может быть от 1 до 200 максимум'),
    Validator.query('lastMessageId', 'Необходимо указать id крайнего сообщения')
        .optional()
        .trim()
        .isInt({
            min: 1,
        })
        .withMessage('id сообщения должно быть больше нуля'),
];
