import { CoreTransformer } from '../../../ship/core/transformer/CoreTransformer';
import { Consultation } from '../models/Consultation';

interface ITransformedResult {
    id: number;
    receptionDate: Date;
    isFirstConsultation: boolean;
    patient: {
        avatar: string;
        name: string;
        surname: string;
    };
    communicationMethod: {
        id: number;
        method: string;
    };
}

class GetPatientsAppointmentsByDateTransformer extends CoreTransformer {
    public transform = (consultations: Array<Consultation>): Array<ITransformedResult> => {
        let result: Array<ITransformedResult> = [];
        for (let i = 0; i < consultations.length; i++) {
            result.push({
                id: consultations[i].getDataValue('id'),
                receptionDate: consultations[i].getDataValue('receptionDate'),
                isFirstConsultation: consultations[i].getDataValue('isFirstConsultation'),
                patient: {
                    name: consultations[i].patient.user.getDataValue('name'),
                    surname: consultations[i].patient.user.getDataValue('surname'),
                    avatar: consultations[i].patient.getDataValue('avatar'),
                },
                communicationMethod: {
                    id: consultations[i].communicationMethod.getDataValue('id'),
                    method: consultations[i].communicationMethod.getDataValue('method'),
                },
            });
        }

        return result;
    };
}

export const getPatientsAppointmentsByDateTransformer = new GetPatientsAppointmentsByDateTransformer();
