import path from "path";

import { CoreAction, IResult } from "../../../ship/core/action/CoreAction";
import { doctorRepository } from "../repositories/DoctorRepository";

interface IParams {
    doctorId: Number;
    INN: String;
    specialties: Array<Number>;
    experience: Date;
}

class DoctorQuestionnaireAction extends CoreAction {
    public run = async (
        doctorId: Number,
        doctorData: IParams,
        doctorImages: any
    ): Promise<IResult> => {
        const doctor = await doctorRepository.getDoctorById(doctorId);

        const uploadPath = "src/app/ship/storage/images/" + doctorImages.photo.name;
        const pathToImage = "/storage/images/" + doctorImages.photo.name;

        try {
            await doctorImages.photo.mv(uploadPath);
        } catch (e) {
            return { error: 1, data: null, message: "Ошибка при обновлении пользователя" };
        }

        try {
            doctor.update({
                photo: pathToImage,
                IIN: doctorData.INN,
                experience: doctorData.experience,
            });
            return { error: 0 };
        } catch (e) {
            return { error: 1, data: null, message: "Ошибка при обновлении пользователя" };
        }
    };
}

export const doctorQuestionnaireAction = new DoctorQuestionnaireAction();
