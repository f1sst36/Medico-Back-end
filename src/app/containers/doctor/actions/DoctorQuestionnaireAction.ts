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

        const uploadPath = "src/app/ship/storage/images/";
        const pathToPhotoImage = "/storage/images/" + doctorImages.photo.name;
        const pathToSummaryImage = "/storage/images/" + doctorImages.summary.name;
        const pathToDiplomaImage = "/storage/images/" + doctorImages.diploma.name;

        try {   
            // специальности добавить не забудь

            doctor.update({
                photo: pathToPhotoImage,
                summary: pathToSummaryImage,
                diploma: pathToDiplomaImage,
                IIN: doctorData.INN,
                experience: doctorData.experience,
            });

            await doctorImages.photo.mv(uploadPath + doctorImages.photo.name);
            await doctorImages.photo.mv(uploadPath + doctorImages.summary.name);
            await doctorImages.photo.mv(uploadPath + doctorImages.diploma.name);
            return { error: 0 };
        } catch (_) {
            return { error: 1, data: null, message: "Ошибка при обновлении пользователя" };
        }
    };
}

export const doctorQuestionnaireAction = new DoctorQuestionnaireAction();
