const Validator = require("express-validator");

export const mostExperiencedDoctorsValidator = [
    Validator.query("count", "Необходимо указать count")
        .trim()
        .isInt({
            min: 1,
        })
        .withMessage("Параметр должен быть числом"),
];
