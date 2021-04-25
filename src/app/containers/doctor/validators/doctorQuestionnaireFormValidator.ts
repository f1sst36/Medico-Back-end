const Validator = require('express-validator');

interface IParams {
    IIN: String;
    specialties: Array<Number>;
    experience: String;
}

export const doctorQuestionnaireFormValidator = [
    Validator.body('experience', 'Необходимо указать стаж')
        .isISO8601()
        .withMessage('Неверный формат стажа'),
];

export const doctorQuestionnaireFormFilesValidator = (
    files: any,
    data: IParams
): Array<String> | false => {
    let errMessages: Array<String> = [];

    if (!data.IIN) errMessages.push('Необходимо указать ИИН');
    else if (!data.IIN.match(/^[0-9]{12}$/)) errMessages.push('Неверный формат ИИН');

    if (!data.specialties || !data.specialties.length)
        errMessages.push('Необходимо указать специальность');

    // if (!data.experience) errMessages.push('Укажите ваш стаж');
    // else if (!(typeof data.experience === 'string' || data.experience instanceof String))
    //     errMessages.push('Неверный формат стажа');

    if (!files) {
        errMessages.push('Ошибка получения файлов');
        return errMessages;
    }
    if (!files.photo) errMessages.push('Необходимо загрузить вашу фотографию');
    if (!files.summary) errMessages.push('Необходимо загрузить резюме');
    if (!files.diploma) errMessages.push('Необходимо загрузить диплом');

    if (files.photo.mimetype !== 'image/jpeg' && files.photo.mimetype !== 'image/png')
        errMessages.push('Неверный формат фотографии');

    return errMessages.length ? errMessages : false;
};
