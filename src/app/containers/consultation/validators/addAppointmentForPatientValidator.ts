const Validator = require('express-validator');

export const addAppointmentForPatientValidator = [
    Validator.body('patientId', 'Необходимо указать id пациента')
        .isInt({ min: 1 })
        .withMessage('id пациента должно быть больше нуля'),
    Validator.body('consultationId', 'Необходимо указать id консультации')
        .isInt({ min: 1 })
        .withMessage('id консультации должно быть больше нуля'),
    Validator.body('appointmentText', 'Текст назначения не может быть пустым')
        .trim()
        .isLength({
            min: 1,
            max: 10000,
        })
        .withMessage('Длина текста должна быть в пределах от 1 до 10 000 символов'),
];
