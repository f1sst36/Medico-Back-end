import { checkPassword, emailRegExp } from "../../../ship/helper/validator";

const Validator = require("express-validator");

export const loginValidator = [
    Validator.body("email", "Почта не может быть пустой")
        .exists()
        .matches(emailRegExp())
        .withMessage("Неверный e-mail"),
    Validator.body("password", "Пароль не может быть пустым")
        .custom((password) => checkPassword(password))
        .withMessage("Неверный пароль"),
];
