import { CoreAction, IResult } from "../../../ship/core/action/CoreAction";
import { patientRepository } from "../repositories/PatientRepository";

interface IParams {
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
    isFullData: boolean;
}

class QuestionnaireFormAction extends CoreAction {
    public run = async (patientData: IParams, patientId: number): Promise<IResult> => {
        const patient = await patientRepository.getPatientById(patientId);

        if (patient.isFullData) return { error: 1, data: null, message: "Анкета уже заполнена" };

        try {
            patientData.isFullData = true;
            patient.update(patientData);
            return { error: 0, data: patient };
        } catch (e) {
            return { error: 1, data: null, message: "Ошибка при обновлении пользователя" };
        }
    };
}

export const questionnaireFormAction = new QuestionnaireFormAction();
