import { emailRegExp } from "../../../ship/helper/validator";

const Validator = require("express-validator");

export const sendEmailValidator = [
    Validator.body("email", "Почта не может быть пустой")
        .exists()
        .matches(emailRegExp())
        .withMessage("Неверный e-mail"),
];
