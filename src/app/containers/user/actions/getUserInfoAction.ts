import { CoreAction, IResult } from "../../../ship/core/action/CoreAction";
import { Doctor } from "../../doctor/models";
import { doctorRepository } from "../../doctor/repositories/DoctorRepository";
import { Patient } from "../../patient/models/Patient";
import { patientRepository } from "../../patient/repositories/PatientRepository";

class GetUserInfoAction extends CoreAction {
    public run = async (userId: Number): Promise<IResult> => {
        let user: Doctor | Patient;
        try {
            user = await patientRepository.getPatientById(userId);
            if (!user) user = await doctorRepository.getDoctorById(userId);
        } catch (_) {
            return { error: 1, data: null, message: "Ошибка поиска пользователя" };
        }

        if (!user) return { error: 1, data: null, message: "Пользователь не найден" };

        return { error: 0, data: user, message: "" };
    };
}

export const getUserInfoAction = new GetUserInfoAction();
