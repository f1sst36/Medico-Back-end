import { format } from "date-fns";
import { CoreAction, IResult } from "../../../ship/core/action/CoreAction";
import { DoctorSpecialtiesLink } from "../models";
import { doctorRepository } from "../repositories/DoctorRepository";
import { specialtiesRepository } from "../repositories/SpecialtiesRepository";

interface IParams {
    doctorId: Number;
    INN: String;
    specialties: String;
    experience: Date;
}

class DoctorQuestionnaireAction extends CoreAction {
    public run = async (
        doctorId: Number,
        doctorData: IParams,
        doctorFiles: any
    ): Promise<IResult> => {
        const doctor = await doctorRepository.getDoctorById(doctorId);

        if (doctor.sent)
            return { error: 1, data: null, message: "Заявка ожидает проверки модератором" };

        const uploadPath = "src/app/ship/storage/files/";
        const pathToPhotoImage = "/storage/files/" + doctorFiles.photo.name;
        const pathToSummaryImage = "/storage/files/" + doctorFiles.summary.name;
        const pathToDiplomaImage = "/storage/files/" + doctorFiles.diploma.name;

        try {
            let specialties = doctorData.specialties.slice(1, doctorData.specialties.length - 1);
            let specialtiesArray = specialties.split(",").map((string) => +string);

            let doctorSpecialtiesLinkRecords: Array<Object> = [];
            for (let i = 0; i < specialtiesArray.length; i++)
                doctorSpecialtiesLinkRecords.push({
                    doctorId: doctorId,
                    specialtyId: specialtiesArray[i],
                });

            DoctorSpecialtiesLink.bulkCreate(doctorSpecialtiesLinkRecords);

            doctor.update({
                photo: pathToPhotoImage,
                summary: pathToSummaryImage,
                diploma: pathToDiplomaImage,
                IIN: doctorData.INN,
                experience: doctorData.experience,
                sent: format(new Date(), "yyyy-MM-dd"),
            });

            await doctorFiles.photo.mv(uploadPath + doctorFiles.photo.name);
            await doctorFiles.summary.mv(uploadPath + doctorFiles.summary.name);
            await doctorFiles.diploma.mv(uploadPath + doctorFiles.diploma.name);

            const result: any = {};
            for (let key in doctor) result[key] = doctor[key];
            const doctorSpecialties = await specialtiesRepository.getSpecialtiesByIds(
                specialtiesArray
            );
            result.specialties = doctorSpecialties;
            console.log(doctorSpecialties);

            return { error: 0, data: result };
        } catch (e) {
            console.log(e);
            
            return { error: 1, data: null, message: "Ошибка при отправке заявки" };
        }
    };
}

export const doctorQuestionnaireAction = new DoctorQuestionnaireAction();
