const Validator = require('express-validator');

export const appointmentForConsultationValidator = [
    Validator.body('doctorId', 'Необходимо указать id доктора')
        .isInt({ min: 1 })
        .withMessage('id доктора должно быть больше нуля'),
    Validator.body('receptionDate', 'Необходимо указать дату и время приема')
        .isISO8601()
        // .matches(/(\+03)$/)
        .withMessage('Неверный формат даты'),
    Validator.body('communicationMethodId', 'Невоходимо указать id метода связи')
        .isInt({ min: 1, max: 3 })
        .withMessage('id метода связи должно быть больше нуля'),
    Validator.body('symptoms', 'Необходимо указать симптомы')
        .isLength({ min: 10 })
        .withMessage('Опишите симптомы подробнее'),
    Validator.body('doctorSpecialtyId', 'Необходимо указать id специальности доктора')
        .isInt({ min: 1 })
        .withMessage('id специальности врача должно быть больше нуля'),
    //
    // Validator.body('cardNumber', 'Необходимо указать номер карты')
    //     .matches(/^[0-9]{4}[0-9]{4}[0-9]{4}[0-9]{4}$/)
    //     .withMessage('Неверный формат карты'),
    // Validator.body('validThru', 'Необходимо указать срок действия карты')
    //     .matches(/^([0]{1}[1-9]{1}|[1]{1}[0-2]{1})\/[0-9]{2}$/)
    //     .withMessage('Неверный формат срока действия'),
    // Validator.body('cardValidationCode', 'Необходимо указать CVC/CVV')
    //     .matches(/^[0-9]{3}&/)
    //     .withMessage('Неверный формат CVC/CVV'),
    // Validator.body('ownersName', 'Необходимо указать имя владельца карты')
    //     .isLength({
    //         min: 3,
    //         max: 255,
    //     })
    //     .withMessage('Неверный формат имени'),
    // Validator.body('isSavedCard', 'Необходимо указать вариант сохранения карты').isBoolean(),
];
