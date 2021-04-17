const Validator = require("express-validator");

export const doctorByIdValidator = [
    Validator.query("id", "Необходимо указать id")
        .trim()
        .isInt({
            min: 1,
        })
        .withMessage("Параметр должен быть числом"),
];
