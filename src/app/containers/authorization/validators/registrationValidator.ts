import { checkPassword, emailRegExp } from '../../../ship/helper/validator';

const Validator = require('express-validator');

export const registrationValidator = [
    Validator.body('name', 'Имя не может быть пустым')
        .isLength({
            min: 3,
            max: 120,
        })
        .withMessage('Имя должно быть от 3 до 120 символов'),
    Validator.body('surname', 'Фамилия не может быть пустой')
        .isLength({
            min: 3,
            max: 120,
        })
        .withMessage('Фамилия должна быть от 3 до 120 символов'),
    Validator.body('password', 'Пароль не может быть пустым')
        .custom((password) => checkPassword(password))
        .withMessage('Неверный пароль'),
    Validator.body('email', 'Почта не может быть пустой')
        .exists()
        .matches(emailRegExp())
        .withMessage('Неверный e-mail'),
    Validator.body('phone', 'Номер телефона обязателен')
        .matches(/^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$/)
        .withMessage('Номер телефона имеет неверный формат'),
    Validator.body('sex', 'Необходимо указать пол')
        .matches(/\b(?:male|female)\b/)
        .withMessage('Выберите пол'),
    Validator.body('birthDate', 'Укажите дату рождения')
        .isISO8601()
        .withMessage('Неверный формат даты рождения'),
    Validator.body('userType', 'Укажите тип пользователя')
        .matches(/\b(?:patient|doctor)\b/)
        .withMessage('Выберите тип пользователя'),
    Validator.body('acceptedUserAgreement', 'Необходимо принять пользовательское соглашение')
        .isBoolean()
        // .matches(/\b(?:1)\b/)
        // .custom((value: Boolean) => {
        //     console.log(value, typeof value);

        //     if (!value) throw new Error("Необходимо принять пользовательское соглашение2");
        // })
        // .isBoolean()
        // .toString()
        .withMessage('Необходимо принять пользовательское соглашение'),
];
