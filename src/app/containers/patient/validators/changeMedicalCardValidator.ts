const Validator = require('express-validator');

export const changeMedicalCardValidator = [
    Validator.body('weight')
        .optional()
        .isFloat({
            min: 1,
            max: 10000,
        })
        .withMessage('Вес должен быть больше нуля'),
    Validator.body('height')
        .optional()
        .isFloat({
            min: 1,
            max: 10000,
        })
        .withMessage('Рост должен быть больше нуля'),
    Validator.body('bloodType')
        .optional()
        .isIn(['I', 'II', 'III', 'IV'])
        .withMessage('Неверный формат группы крови'),
    Validator.body('RHFactor', 'Необходимо указать резус фактор')
        .optional()
        .isIn(['Rh+', 'Rh-'])
        .withMessage('Неверный тип резус фактора'),
    Validator.body('allergies')
        .optional()
        .isString()
        .isLength({
            max: 2000,
        })
        .withMessage('Неверный формат описания аллергии'),
    Validator.body('chronicDiseases')
        .optional()
        .isString()
        .isLength({
            max: 2000,
        })
        .withMessage('Неверный формат описания хронический заболеваний'),
    Validator.body('operations')
        .optional()
        .isString()
        .isLength({
            max: 2000,
        })
        .withMessage('Неверный формат описания операций'),
    Validator.body('isSmoker')
        .optional()
        .isIn(['Да', 'Нет', 'Иногда'])
        .withMessage('Неверный тип курения'),
    Validator.body('isAlcoholic')
        .optional()
        .isIn(['1 раз в год', '1 раз в месяц', '1 раз в неделю', 'более 3 раз в неделю'])
        .withMessage('Неверный тип отношения к алкоголю'),
    Validator.body('badHabits')
        .optional()
        .isLength({
            max: 3000,
        })
        .withMessage("Максимальная длина поля 'Вредные привычки' 3000 символов"),
    Validator.body('bloodTransfusion')
        .optional()
        .isIn(['Да', 'Нет'])
        .withMessage(
            "Неверный тип ответа на вопрос: 'Была ли у Вас процедура по переливанию крови?'"
        ),
];
