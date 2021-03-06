const Validator = require("express-validator");

export const registrationValidator = [
    Validator.body("name", "Имя не может быть пустым")
        .isLength({
            min: 3,
            max: 120,
        })
        .withMessage("Имя должно быть от 3 до 120 символов"),
    Validator.body("surname", "Фамилия не может быть пустой")
        .isLength({
            min: 3,
            max: 120,
        })
        .withMessage("Фамилия должна быть от 3 до 120 символов"),
    Validator.body("age", "Возраст не может быть пустым")
        .isNumeric()
        .withMessage("Возраст должен быть числом"),
    Validator.body("password", "Парль не может быть пустым")
        .isLength({
            min: 6,
            max: 40,
        })
        .withMessage("Пароль должен содержать от 6 до 40 символов"),
    Validator.body("email", "Почта не может быть пустой")
        .exists()
        .isEmail()
        .withMessage("Неверный e-mail"),
    Validator.body("phone", "Номер телефона обязателен")
        .matches(/^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$/)
        .withMessage("Номер телефона имеет неверный формат"),
    Validator.body("sex", "Необходимо указать пол")
        .matches(/\b(?:male|female)\b/)
        .withMessage("Выберите пол"),
    Validator.body("birthDate", "Укажите дату рождения")
        .isLength({
            min: 4,
            max: 100,
        })
        .withMessage("Неверный формат даты рождения"),
    Validator.body("userType", "Укажите тип пользователя")
        .matches(/\b(?:pacient|doctor)\b/)
        .withMessage("Выберите тип пользователя"),
    Validator.body("acceptedUserAgreement", "Необходимо принять пользовательское соглашение")
        .matches(/\b(?:true|1)\b/)
        .withMessage("Необходимо принять пользовательское соглашение"),
];
