import { CoreAction, IResult } from '../../../ship/core/action/CoreAction';
import { doctorRepository } from '../repositories/DoctorRepository';

interface IParams {
    costOfConsultation?: number;
    about?: string;
    education?: Array<any>;
    workplaces?: Array<any>;
}

class ChangeDoctorsInfoAction extends CoreAction {
    private stringifyArray = (array: Array<any>): Array<any> => {
        for (let i = 0; i < array.length; i++) array[i] = JSON.stringify(array[i]);
        return array;
    };

    private toJSONArray = (array: Array<any>): Array<any> => {
        for (let i = 0; i < array.length; i++) {
            try {
                array[i] = JSON.parse(array[i]);
            } catch (e) {
                //
            }
        }
        return array;
    };

    public run = async (doctorId: number, data: IParams): Promise<IResult> => {
        if (
            !data.hasOwnProperty('costOfConsultation') &&
            !data.hasOwnProperty('about') &&
            !data.hasOwnProperty('education') &&
            !data.hasOwnProperty('workplaces')
        )
            return {
                error: 1,
                message: 'Нет полей для изменения',
            };

        if (
            (data.hasOwnProperty('education') && !Array.isArray(data.education)) ||
            (data.hasOwnProperty('workplaces') && !Array.isArray(data.workplaces))
        )
            return {
                error: 1,
                message: 'Поля education и workplaces должны быть массивами',
            };

        if (data.hasOwnProperty('education')) data.education = this.stringifyArray(data.education);
        if (data.hasOwnProperty('workplaces'))
            data.workplaces = this.stringifyArray(data.workplaces);

        const updateObject: any = {};

        if (data.hasOwnProperty('costOfConsultation'))
            updateObject.costOfConsultation = data.costOfConsultation;
        if (data.hasOwnProperty('about')) updateObject.about = data.about;
        if (data.hasOwnProperty('education')) updateObject.education = data.education;
        if (data.hasOwnProperty('workplaces')) updateObject.workplaces = data.workplaces;

        try {
            await doctorRepository.updateDoctorsInfo(doctorId, updateObject);

            if (data.hasOwnProperty('education'))
                updateObject.education = this.toJSONArray(data.education);
            if (data.hasOwnProperty('workplaces'))
                updateObject.workplaces = this.toJSONArray(data.workplaces);
        } catch (e) {
            return {
                error: 2,
                message: 'Ошибка изменения данных врача',
            };
        }

        return {
            error: 0,
            data: data,
        };
    };
}

export const changeDoctorsInfoAction = new ChangeDoctorsInfoAction();
