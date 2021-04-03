interface IParams {
    IIN: String;
    specialties: Array<Number>;
    experience: String;
}

export const doctorQuestionnaireFormValidator = (data: IParams, files: any): Array<String> | false => {
    let errMessages: Array<String> = [];

    if (!data.IIN) errMessages.push("Необходимо указать ИИН");
    else if (!data.IIN.match(/^[0-9]{12}$/))
        errMessages.push("Неверный формат ИИН");

    if (!data.specialties || !data.specialties.length)
        errMessages.push("Необходимо указать специальность");

    if (!data.experience) errMessages.push("Укажите ваш стаж");
    // else if (!data.experience.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/))
    //     errMessages.push("Неверный формат стажа");
    
    if(!files){
        errMessages.push("Ошибка получения файлов"); 
        return errMessages;
    } 
    if(!files.photo) errMessages.push("Необходимо загрузить вашу фотографию"); 
    if(!files.summary) errMessages.push("Необходимо загрузить резюме"); 
    if(!files.diploma) errMessages.push("Необходимо загрузить диплом"); 

    return errMessages.length ? errMessages : false;
};
