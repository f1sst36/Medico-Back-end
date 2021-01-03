const Validator = require("express-validator");

export const loginValidator = [
    Validator.body("email", "Почта не может быть пустой")
        .exists()
        .isEmail()
        .withMessage("Неверный e-mail"),
    Validator.body("password", "Пароль не может быть пустым").exists(),
];
