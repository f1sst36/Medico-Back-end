import { CoreAction, IResult } from "../../../ship/core/action/CoreAction";
import { pacientRepository } from "../repositories/PacientRepository";

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
    public run = async (pacientData: IParams, pacientId: Number): Promise<IResult> => {
        const pacient = await pacientRepository.getPacientById(pacientId);

        try {
            pacient.update(pacientData);
            return { error: 0, data: pacient };
        } catch (e) {
            return { error: 1, data: null, message: "Ошибка при обновлении пользователя" };
        }
    };
}

export const questionnaireFormAction = new QuestionnaireFormAction();
