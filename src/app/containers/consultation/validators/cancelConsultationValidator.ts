const Validator = require('express-validator');

export const cancelConsultationValidator = [
    Validator.body('consultationId', 'Необходимо указать id консультации')
        .isInt({
            min: 1,
        })
        .withMessage('id консультации должен быть больше нуля'),
];
