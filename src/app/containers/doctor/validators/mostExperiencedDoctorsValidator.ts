const Validator = require("express-validator");

export const mostExperiencedDoctorsValidator = [
    Validator.query("count", "Необходимо указать count")
        .trim()
        .isInt()
        .withMessage("Параметр должен быть числом"),
];
