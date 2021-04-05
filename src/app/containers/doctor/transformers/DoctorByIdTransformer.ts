import { CoreTransformer, IResponse } from "../../../ship/core/transformer/CoreTransformer";
import { Doctor } from "../models";

interface IDoctorResult {
    id: Number;
    name: String;
    surname: String;
    middleName?: String;
    rating: Number;
    about: String;
    experience: String;
    reviews: Array<Object>;
    education: Array<String>;
    workplaces: Array<String>;
    workTime: String;
    photo: String;
    costOfConsultation: String;
    specialties: Array<String>;
}

class DoctorByIdTransformer extends CoreTransformer {
    public transform = (doctor: any): IDoctorResult => {
        let result: IDoctorResult;

        result = {
            id: doctor.getDataValue("id"),
            name: doctor.user.getDataValue("name"),
            surname: doctor.user.getDataValue("surname"),
            middleName: doctor.user.getDataValue("middleName"),
            rating: doctor.getDataValue("rating"),
            about: doctor.getDataValue("about"),
            experience: doctor.transformExperience(),
            reviews: doctor.getDataValue("reviews") ? doctor.getDataValue("reviews") : [],
            education: doctor.getDataValue("education"),
            workplaces: doctor.getDataValue("workplaces"),
            workTime: doctor.getDataValue("workTime"),
            photo: doctor.getDataValue("photo"),
            costOfConsultation: doctor.getDataValue("costOfConsultation"),
            specialties: [],
        };

        for (let key in doctor.doctorSpecialtiesLink) {
            result.specialties.push(doctor.doctorSpecialtiesLink[key].specialty.dataValues);
        }

        return result;
    };
}

export const doctorByIdTransformer = new DoctorByIdTransformer();
