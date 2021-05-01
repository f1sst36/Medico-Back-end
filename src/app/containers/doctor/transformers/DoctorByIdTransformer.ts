import { CoreTransformer } from "../../../ship/core/transformer/CoreTransformer";
import { Doctor } from "../models";

interface Review {
    id: number;
    name: string;
    surname: string;
    avatar: string;
    text: string;
    estimation: number;
    createdAt: Date;
}

interface IDoctorResult {
    id: number;
    name: string;
    surname: string;
    middleName?: string;
    rating: number;
    about: string;
    experience: string;
    reviews: Array<Review>;
    countOfReviews: number;
    education: Array<string>;
    workplaces: Array<string>;
    workTime: string;
    photo: string;
    costOfConsultation: string;
    specialties: Array<string>;
}

class DoctorByIdTransformer extends CoreTransformer {
    public transform = (doctor: any, countOfReviews: number): IDoctorResult => {
        let result: IDoctorResult;

        result = {
            id: doctor.getDataValue("id"),
            name: doctor.user.getDataValue("name"),
            surname: doctor.user.getDataValue("surname"),
            middleName: doctor.user.getDataValue("middleName"),
            rating: doctor.getRating(),
            about: doctor.getDataValue("about"),
            experience: doctor.transformExperience(),
            reviews: [],
            countOfReviews: countOfReviews,
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
                id: doctor.reviews[key].getDataValue("id"),
                name: doctor.reviews[key].patient.user.getDataValue("name"),
                surname: doctor.reviews[key].patient.user.getDataValue("surname"),
                avatar: doctor.reviews[key].patient.getDataValue("avatar"),
                text: doctor.reviews[key].getDataValue("text"),
                estimation: doctor.reviews[key].getDataValue("estimation"),
                createdAt: doctor.reviews[key].getDataValue("createdAt"),
            });
        }

        return result;
    };
}

export const doctorByIdTransformer = new DoctorByIdTransformer();
