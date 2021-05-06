const Validator = require('express-validator');

export const deleteAnalysisValidator = [
    Validator.body('analysisId', 'Необходимо указать id анализа')
        .isInt({
            min: 1,
        })
        .withMessage('Id анализа должен быть больше нуля'),
];
