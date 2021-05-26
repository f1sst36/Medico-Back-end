const Validator = require('express-validator');

export const loadVoiceMessageValidator = [
    Validator.body('chatId', 'Необходимо указать id чата')
        .isInt({ min: 1 })
        .withMessage('id чата должно быть больше нуля'),
    Validator.body('authorId', 'Необходимо указать id автора')
        .isInt({ min: 1 })
        .withMessage('id автора должно быть больше нуля'),
    Validator.body('uuid', 'Необходимо указать uuid')
        .isString()
        .withMessage('Неверный формат uuid'),
];

export const isValidVoiceMessageValidator = (files: any): Array<String> | false => {
    let errMessages: Array<String> = [];

    if (!files) {
        errMessages.push('Ошибка получения аудиофайла');
        return errMessages;
    }
    if (!files.file) {
        errMessages.push('Необходимо загрузить аудиофайл');
        return errMessages;
    }

    if (files.file.mimetype !== 'audio/wav') errMessages.push('Неверный формат аудиофайла');

    return errMessages.length ? errMessages : false;
};
