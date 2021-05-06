const Validator = require('express-validator');

export const appendAnalysisValidator = [
    Validator.body('name', 'Необходимо указать имя анализа')
        .isLength({ min: 1, max: 200 })
        .withMessage('Имя должно содержать до 200 символов'),
    Validator.body('type', 'Необходимо указать тип анализа')
        .isIn(['analysis', 'snapshot'])
        .withMessage('Неверный тип анализа'),
    Validator.body('analysisDeliveryDate', 'Необходимо указать дату сдачи анализа')
        .isISO8601()
        .withMessage('Неверный формат даты сдачи анализа'),
];

export const isValidImageValidator = (files: any): Array<String> | false => {
    let errMessages: Array<String> = [];

    if (!files) {
        errMessages.push('Ошибка получения файла');
        return errMessages;
    }
    if (!files.file) {
        errMessages.push('Необходимо загрузить фотографию анализа');
        return errMessages;
    }

    if (files.file.mimetype !== 'image/jpeg' && files.file.mimetype !== 'image/png')
        errMessages.push('Неверный формат изображения');

    return errMessages.length ? errMessages : false;
};
