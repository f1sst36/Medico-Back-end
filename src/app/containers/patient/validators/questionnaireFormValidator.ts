const Validator = require("express-validator");

export const questionnaireFormValidator = [
    Validator.body("weight", "Необходимо указать вес")
        .isFloat({
            min: 0,
        })
        .withMessage("Вес не может быть меньше нуля"),
    Validator.body("height", "Необходимо указать рост")
        .isFloat({
            min: 0,
        })
        .withMessage("Рост не может быть меньше нуля"),
    Validator.body("bloodType", "Необходимо указать группу крови")
        .isIn(["I", "II", "III", "IV"])
        .withMessage("Неверный тип группы крови"),
    Validator.body("RHFactor", "Необходимо указать резус фактор")
        .isIn(["Rh+", "Rh-"])
        .withMessage("Неверный тип резус фактора"),
    Validator.body("allergies")
        .isString()
        .withMessage("Поле 'Аллергии' обязательно")
        .isLength({
            max: 3000,
        })
        .withMessage("Максимальная длина поля 'Аллергии' 3000 символов"),
    Validator.body("chronicDiseases")
        .isString()
        .withMessage("Поле 'Хронические заболевания' обязательно")
        .isLength({
            max: 3000,
        })
        .withMessage("Максимальная длина поля 'Хронические заболевания' 3000 символов"),
    Validator.body("operations")
        .isString()
        .withMessage("Поле 'Операции' обязательно")
        .isLength({
            max: 3000,
        })
        .withMessage("Максимальная длина поля 'Операции' 3000 символов"),
    Validator.body("isSmoker", "Необходимо указать состояние курения")
        .isIn(["Да", "Нет", "Иногда"])
        .withMessage("Неверный тип курения"),
    Validator.body("isAlcoholic", "Необходимо указать отношение к алкоголю")
        .isIn(["1 раз в год", "1 раз в месяц", "1 раз в неделю", "более 3 раз в неделю"])
        .withMessage("Неверный тип отношения к алкоголю"),
    Validator.body("badHabits")
        .isLength({
            max: 3000,
        })
        .withMessage("Максимальная длина поля 'Вредные привычки' 3000 символов"),
    Validator.body(
        "bloodTransfusion",
        "Необходимо ответить: 'Была ли у Вас процедура по переливанию крови?'"
    )
        .matches(/\b(?:1|0)\b/)
        .withMessage(
            "Неверный тип ответа на вопрос: 'Была ли у Вас процедура по переливанию крови?'"
        ),
    Validator.body("specialDiseases")
        .isArray({
            min: 0,
            max: 3,
        })
        .withMessage("Неверный формат ответа на вопрос о доп. заболеваниях"),
];
