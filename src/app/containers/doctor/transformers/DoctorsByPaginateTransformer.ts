import { CoreTransformer, IResponse } from "../../../ship/core/transformer/CoreTransformer";

class DoctorsByPaginateTransformer extends CoreTransformer {
    public transform = (doctors: Array<any>): Array<Object> => {
        for (let key in doctors) {
            doctors[key].dataValues.experience = doctors[key].transformExperience();
            doctors[key].dataValues.specialties = [];

            for (let k in doctors[key].dataValues.doctorSpecialtiesLink)
                doctors[key].dataValues.specialties.push(
                    doctors[key].dataValues.doctorSpecialtiesLink[k].specialty
                );

            for (let k in doctors[key].dataValues.user.dataValues)
                doctors[key].dataValues[k] = doctors[key].dataValues.user.dataValues[k];

            delete doctors[key].dataValues.doctorSpecialtiesLink;
            delete doctors[key].dataValues.user;
        }

        return doctors;
    };
}

export const doctorsByPaginateTransformer = new DoctorsByPaginateTransformer();
