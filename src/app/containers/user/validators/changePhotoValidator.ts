export const changePhotoValidator = (files: any): Array<String> | false => {
    let errMessages: Array<String> = [];

    if (!files) {
        errMessages.push('Ошибка получения файла');
        return errMessages;
    }
    if (!files.file) {
        errMessages.push('Необходимо загрузить фотографию');
        return errMessages;
    }

    if (files.file.mimetype !== 'image/jpeg' && files.file.mimetype !== 'image/png')
        errMessages.push('Неверный формат изображения');

    return errMessages.length ? errMessages : false;
};