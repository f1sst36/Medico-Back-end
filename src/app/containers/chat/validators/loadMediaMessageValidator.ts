const Validator = require('express-validator');

export const loadMediaMessageValidator = [
    Validator.body('chatId', 'Необходимо указать id чата')
        .isInt({ min: 1 })
        .withMessage('id чата должно быть больше нуля'),
    Validator.body('uuid', 'Необходимо указать uuid')
        .optional()
        .isString()
        .withMessage('Неверный формат uuid'),
    Validator.body('type', 'Необходимо указать тип файла')
        .isIn(['image', 'audio', 'file'])
        .withMessage('Неверный тип файла'),
];

export const isValidMediaMessageValidator = (files: any): Array<String> | false => {
    let errMessages: Array<String> = [];

    if (!files) {
        errMessages.push('Ошибка получения файла');
        return errMessages;
    }
    if (!files.file) {
        errMessages.push('Необходимо загрузить файл');
        return errMessages;
    }

    if (
        files.file.mimetype !== 'audio/wav' &&
        files.file.mimetype !== 'image/jpeg' &&
        files.file.mimetype !== 'image/png' &&
        files.file.mimetype !== 'image/gif' &&
        files.file.mimetype !== 'text/plain' &&
        files.file.mimetype !== 'application/msword' &&
        files.file.mimetype !== 'application/pdf'
    )
        errMessages.push('Неверный формат файла');

    return errMessages.length ? errMessages : false;
};
