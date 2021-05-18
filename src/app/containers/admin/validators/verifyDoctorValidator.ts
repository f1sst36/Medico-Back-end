const Validator = require('express-validator');

export const verifyDoctorValidator = [
    Validator.body('doctorId', 'Необходимо указать id доктора')
        .isInt({
            min: 1,
        })
        .withMessage('id должно быть больше нуля'),
];
