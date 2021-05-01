import { CoreTransformer, IResponse } from "../../../ship/core/transformer/CoreTransformer";
import { Doctor } from "../models";

interface IMostExpreriencedDoctorResult {
    id: number;
    name: string;
    surname: string;
    middleName?: string;
    experience: string;
    photo: string;
    specialties: Array<any>;
}

class MostExperiencedDoctorsTransformer extends CoreTransformer {
    public transform = (doctors: Array<any>): Array<IMostExpreriencedDoctorResult> => {
        let result: Array<IMostExpreriencedDoctorResult> = [];

        for (let key in doctors) {
            let doctor = {
                id: doctors[key].getDataValue("id"),
                name: doctors[key].user.getDataValue("name"),
                surname: doctors[key].user.getDataValue("surname"),
                middleName: doctors[key].user.getDataValue("middleName"),
                experience: doctors[key].transformExperience(),
                photo: doctors[key].getDataValue("photo"),
                specialties: [],
            };

            for (let k in doctors[key].doctorSpecialtiesLink)
                doctor.specialties.push(doctors[key].doctorSpecialtiesLink[k].specialty.dataValues);

            result.push(doctor);
        }

        return result;
    };
}

export const mostExperiencedDoctorsTransformer = new MostExperiencedDoctorsTransformer();
