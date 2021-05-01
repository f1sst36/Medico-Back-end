import { format } from 'date-fns';
import { CoreAction, IResult } from '../../../ship/core/action/CoreAction';
import { DoctorSpecialtiesLink } from '../models';
import { doctorRepository } from '../repositories/DoctorRepository';
import { specialtyRepository } from '../repositories/SpecialtyRepository';

interface IParams {
    doctorId: number;
    IIN: string;
    specialties: string;
    experience: Date;
}

class DoctorQuestionnaireAction extends CoreAction {
    public run = async (
        doctorId: number,
        doctorData: IParams,
        doctorFiles: any
    ): Promise<IResult> => {
        const doctor = await doctorRepository.getDoctorById(doctorId);

        if (!doctor)
            return {
                error: 1,
                message: 'Доктор не найден',
            };

        if (doctor.sent)
            return { error: 1, data: null, message: 'Заявка ожидает проверки модератором' };

        const uploadPath = 'src/app/ship/storage/files/';
        const pathToPhotoImage = '/storage/files/' + doctorFiles.photo.name;
        const pathToSummaryImage = '/storage/files/' + doctorFiles.summary.name;
        const pathToDiplomaImage = '/storage/files/' + doctorFiles.diploma.name;

        try {
            let specialties = doctorData.specialties.slice(1, doctorData.specialties.length - 1);
            let specialtiesArray = [...new Set(specialties.split(',').map((string) => +string))];

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
                IIN: doctorData.IIN,
                experience: doctorData.experience,
                sent: format(new Date(), 'yyyy-MM-dd'),
            });

            await doctorFiles.photo.mv(uploadPath + doctorFiles.photo.name);
            await doctorFiles.summary.mv(uploadPath + doctorFiles.summary.name);
            await doctorFiles.diploma.mv(uploadPath + doctorFiles.diploma.name);

            const result: any = {};
            for (let key in doctor) result[key] = doctor[key];
            const doctorSpecialties = await specialtyRepository.getSpecialtiesByIds(
                specialtiesArray
            );
            result.dataValues.specialties = doctorSpecialties;
            result.dataValues.experience = doctor.transformExperience();
            delete result.dataValues.user;

            return { error: 0, data: result.dataValues };
        } catch (e) {
            console.log(e);

            return { error: 1, data: null, message: 'Ошибка при отправке заявки' };
        }
    };
}

export const doctorQuestionnaireAction = new DoctorQuestionnaireAction();
