import { CoreAction, IResult } from "../../../ship/core/action/CoreAction";
import { patientRepository } from "../repositories/PatientRepository";

interface IParams {
    weight: Number;
    height: Number;
    bloodType: String;
    RHFactor: String;
    allergies: Array<String>;
    chronicDiseases: Array<String>;
    operations: String;
    isSmoker: String;
    isAlcoholic: String;
    badHabits: String;
    bloodTransfusion: Boolean;
}

class QuestionnaireFormAction extends CoreAction {
    public run = async (patientData: IParams, patientId: Number): Promise<IResult> => {
        const patient = await patientRepository.getPatientById(patientId);

        try {
            patient.update(patientData);
            return { error: 0, data: patient };
        } catch (e) {
            return { error: 1, data: null, message: "Ошибка при обновлении пользователя" };
        }
    };
}

export const questionnaireFormAction = new QuestionnaireFormAction();
