const Validator = require("express-validator");

export const registrationValidator = [
    Validator.body("name", "Имя не может быть пустым")
        .isLength({
            min: 3,
            max: 120,
        })
        .withMessage("Имя должно быть от 3 до 120 символов"),
    Validator.body("age", "Возраст не может быть пустым")
        .isNumeric()
        .withMessage("Поле должно быть числом"),
    Validator.body("password", "Парль не может быть пустым")
        .isLength({
            min: 6,
            max: 40,
        })
        .withMessage("Пароль должен быть от 6 до 40 символов"),
];
