import { CoreAction, IResult } from "../../../ship/core/action/CoreAction";
import { patientRepository } from "../repositories/PatientRepository";

interface IParams {
    weight: Number;
    height: Number;
    bloodType: String;
    RHFactor: String;
    allergies: String;
    chronicDiseases: String;
    operations: String;
    isSmoker: String;
    isAlcoholic: String;
    badHabits: String;
    bloodTransfusion: Boolean;
    specialDiseases: Array<any>;
    isFullData?: Boolean;
}

class QuestionnaireFormAction extends CoreAction {
    public run = async (patientData: IParams, patientId: Number): Promise<IResult> => {
        const patient = await patientRepository.getPatientById(patientId);

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
