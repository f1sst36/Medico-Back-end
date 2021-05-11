import { emailRegExp } from '../../../ship/helper';

const Validator = require('express-validator');

export const leaveFeedbackValidator = [
    Validator.body('name', 'Необходимо указать ваше имя')
        .isLength({ min: 2, max: 200 })
        .withMessage('Имя должно содержать от 2 до 200 символов'),
    Validator.body('email', 'Почта не может быть пустой')
        .matches(emailRegExp())
        .withMessage('Неверный e-mail'),
    Validator.body('subject', 'Необходимо указать тему письма')
        .isLength({ min: 2, max: 200 })
        .withMessage('Тема должна содержать от 2 до 200 символов'),
    Validator.body('text', 'Необходимо написать текст письма')
        .isLength({ min: 5, max: 30000 })
        .withMessage('Текст письма должен содержать от 5 до 30000 символов'),
];
