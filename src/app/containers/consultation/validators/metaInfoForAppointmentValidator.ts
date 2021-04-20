const Validator = require('express-validator');

export const metaInfoForAppointmentValidator = [
    Validator.query('doctorId', 'Необходимо указать id доктора')
        .trim()
        .isInt({
            min: 1,
        })
        .withMessage('id доктора - целое число больше нуля'),
];
