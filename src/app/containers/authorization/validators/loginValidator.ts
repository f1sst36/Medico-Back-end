const Validator = require("express-validator");

export const loginValidator = [
    Validator.body("email", "Почта не может быть пустой")
        .exists()
        .isEmail()
        .withMessage("Неверный e-mail"),
    Validator.body("password", "Парль не может быть пустым")
        .isLength({
            min: 6,
            max: 40,
        })
        .withMessage("Пароль должен быть от 6 до 40 символов"),
];
