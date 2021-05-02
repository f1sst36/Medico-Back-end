import { CoreTransformer } from '../../../ship/core/transformer/CoreTransformer';
import { Consultation } from '../models/Consultation';

interface IResult {
    id: number;
    receptionDate: Date;
    communicationMethod: {
        id: number;
        method: string;
    };
    doctorSpecialty: {
        id: number;
        name: string;
    };
    doctor: {
        id: number;
        photo: string;
        name: string;
        surname: string;
        middleName: string;
    };
}

class ConsultationsForCurrentPatientTransformer extends CoreTransformer {
    public transform = (consultations: Array<Consultation>): Array<IResult> => {
        let result: Array<IResult> = [];

        for (let i = 0; i < consultations.length; i++) {
            result.push({
                id: consultations[i].getDataValue('id'),
                receptionDate: consultations[i].getDataValue('receptionDate'),
                communicationMethod: {
                    id: consultations[i].communicationMethod.getDataValue('id'),
                    method: consultations[i].communicationMethod.getDataValue('method'),
                },
                doctorSpecialty: {
                    id: consultations[i].doctorSpecialty.getDataValue('id'),
                    name: consultations[i].doctorSpecialty.getDataValue('name'),
                },
                doctor: {
                    id: consultations[i].doctor.getDataValue('id'),
                    name: consultations[i].doctor.user.getDataValue('name'),
                    surname: consultations[i].doctor.user.getDataValue('surname'),
                    middleName: consultations[i].doctor.user.getDataValue('middleName'),
                    photo: consultations[i].doctor.getDataValue('photo'),
                },
            });
        }

        return result;
    };
}

export const consultationsForCurrentPatientTransformer = new ConsultationsForCurrentPatientTransformer();
