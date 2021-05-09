import { CoreTask, IResult } from '../../../ship/core/task/CoreTask';
import { Patient } from '../models/Patient';
import { patientRepository } from '../repositories/PatientRepository';

interface IParam {
    weight: number;
    height: number;
    bloodType: string;
    RHFactor: string;
    allergies: string;
    chronicDiseases: string;
    operations: string;
    isSmoker: string;
    isAlcoholic: string;
    badHabits: string;
    bloodTransfusion: string;
}

class ChangeMedicalCardTask extends CoreTask {
    public run = async (data: IParam, patientId: number): Promise<IResult> => {
        if (
            !data.hasOwnProperty('weight') &&
            !data.hasOwnProperty('height') &&
            !data.hasOwnProperty('bloodType') &&
            !data.hasOwnProperty('allergies') &&
            !data.hasOwnProperty('chronicDiseases') &&
            !data.hasOwnProperty('operations') &&
            !data.hasOwnProperty('isSmoker') &&
            !data.hasOwnProperty('isAlcoholic') &&
            !data.hasOwnProperty('bloodTransfusion') &&
            !data.hasOwnProperty('RHFactor') &&
            !data.hasOwnProperty('badHabits')
        )
            return { error: 1, message: 'Отсутствуют данные для изменения' };

        const patient = await patientRepository.getPatientById(patientId);

        if (!patient)
            return {
                error: 2,
                message: 'Пациент не найден',
            };

        let updatedPatient;
        try {
            updatedPatient = await patient.update(data);
        } catch (e) {
            return {
                error: 3,
                message: 'Ошибка обновления мед. карты',
            };
        }

        return {
            error: 0,
            data: updatedPatient,
            message: '',
        };
    };
}

export const changeMedicalCardTask = new ChangeMedicalCardTask();
