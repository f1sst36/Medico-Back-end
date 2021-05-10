const Validator = require('express-validator');

import { emailRegExp } from '../../../ship/helper';

// const eighteenYears = 567648000;
// const currentDate = new Date();
// const startDate = new Date(1970, 0, 1);
// const currentDateMinusEighteenYers = startDate.setSeconds(
//     currentDate.getTime() / 1000 - eighteenYears
// );

export const changeUserInfoValidator = [
    Validator.body('name')
        .optional()
        .isLength({
            min: 2,
            max: 200,
        })
        .withMessage('Имя должно быть не меньше двух символов'),
    Validator.body('surname')
        .optional()
        .isLength({
            min: 2,
            max: 200,
        })
        .withMessage('Фамилия должна быть не меньше двух символов'),
    Validator.body('middleName')
        .optional()
        .isLength({
            max: 200,
        })
        .withMessage('Отчество должно быть не меньше двух символов'),
    Validator.body('birthDate').optional().isISO8601().withMessage('Неверный формат даты рождения'),
    Validator.body('sex').optional().isIn(['male', 'female']).withMessage('Неверный формат пола'),
    Validator.body('phone')
        .optional()
        .matches(/^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$/)
        .withMessage('Номер телефона имеет неверный формат'),
];
