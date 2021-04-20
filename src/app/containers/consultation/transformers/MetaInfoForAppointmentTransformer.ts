import { CoreTransformer } from '../../../ship/core/transformer/CoreTransformer';

interface IDoctor {
    id: number;
    name: string;
    surname: string;
    middleName?: string;
    rating: number;
    experience: string;
    countOfReviews: number;
    photo: string;
    costOfConsultation: string;
    specialties: Array<string>;
}

interface ICommunicationMethod {
    id: number;
    method: string;
}

interface IResult {
    doctor: IDoctor;
    communicationMethods: Array<ICommunicationMethod>;
}

class MetaInfoForAppointmentTransformer extends CoreTransformer {
    public transform = (
        doctor: any,
        countOfReviews: number,
        communicationMethods: Array<ICommunicationMethod>
    ): IResult => {
        let result: IResult;

        result = {
            doctor: {
                id: doctor.getDataValue('id'),
                name: doctor.user.getDataValue('name'),
                surname: doctor.user.getDataValue('surname'),
                middleName: doctor.user.getDataValue('middleName'),
                rating: doctor.getRating(),
                experience: doctor.transformExperience(),
                countOfReviews: countOfReviews,
                photo: doctor.getDataValue('photo'),
                costOfConsultation: doctor.getDataValue('costOfConsultation'),
                specialties: [],
            },
            communicationMethods: communicationMethods,
        };

        for (let key in doctor.doctorSpecialtiesLink)
            result.doctor.specialties.push(doctor.doctorSpecialtiesLink[key].specialty.dataValues);

        return result;
    };
}

export const metaInfoForAppointmentTransformer = new MetaInfoForAppointmentTransformer();
