import { CoreTransformer, IResponse } from "../../../ship/core/transformer/CoreTransformer";
import { Doctor } from "../models";

interface Review {
    name: String;
    surname: String;
    avatar: String;
    text: String;
    rating: Number;
    createdAt: Date;
}

interface IDoctorResult {
    id: Number;
    name: String;
    surname: String;
    middleName?: String;
    rating: Number;
    about: String;
    experience: String;
    reviews: Array<Review>;
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
            reviews: [],
            education: doctor.getDataValue("education"),
            workplaces: doctor.getDataValue("workplaces"),
            workTime: doctor.getDataValue("workTime"),
            photo: doctor.getDataValue("photo"),
            costOfConsultation: doctor.getDataValue("costOfConsultation"),
            specialties: [],
        };

        for (let key in doctor.doctorSpecialtiesLink)
            result.specialties.push(doctor.doctorSpecialtiesLink[key].specialty.dataValues);

        for (let key in doctor.reviews) {
            if (!doctor.reviews[key].patient) continue;

            result.reviews.push({
                name: doctor.reviews[key].patient.user.getDataValue("name"),
                surname: doctor.reviews[key].patient.user.getDataValue("surname"),
                avatar: doctor.reviews[key].patient.getDataValue("avatar"),
                text: doctor.reviews[key].getDataValue("text"),
                rating: doctor.reviews[key].getDataValue("rating"),
                createdAt: doctor.reviews[key].getDataValue("createdAt"),
            });
        }

        return result;
    };
}

export const doctorByIdTransformer = new DoctorByIdTransformer();
