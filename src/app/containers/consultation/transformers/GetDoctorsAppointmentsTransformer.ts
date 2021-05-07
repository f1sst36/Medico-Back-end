import { CoreTransformer } from '../../../ship/core/transformer/CoreTransformer';
import { Consultation } from '../models/Consultation';

interface ITransformedResult {
    appointment: string;
    receptionDate: Date;
    doctor: {
        id: number;
        name: string;
        surname: string;
        middleName: string;
        photo: string;
        specialty: string;
    };
}

class GetDoctorsAppointmentsTransformer extends CoreTransformer {
    public transform = (consultations: Array<Consultation>): Array<ITransformedResult> => {
        const result: Array<ITransformedResult> = [];

        for (let i = 0; i < consultations.length; i++) {
            result.push({
                appointment: consultations[i].getDataValue('appointment'),
                receptionDate: consultations[i].getDataValue('receptionDate'),
                doctor: {
                    id: consultations[i].doctor.getDataValue('id'),
                    name: consultations[i].doctor.user.getDataValue('name'),
                    surname: consultations[i].doctor.user.getDataValue('surname'),
                    middleName: consultations[i].doctor.user.getDataValue('middleName'),
                    photo: consultations[i].doctor.getDataValue('photo'),
                    specialty: consultations[i].doctorSpecialty.getDataValue('name'),
                },
            });
        }

        return result;
    };
}

export const getDoctorsAppointmentsTransformer = new GetDoctorsAppointmentsTransformer();
