import { Consultation } from '../../../containers/consultation/models/Consultation';
import { CoreTransformer } from '../../../ship/core/transformer/CoreTransformer';
import { Analysis } from '../models/Analysis';
import { Patient } from '../models/Patient';

interface IParam {
    patient: Patient;
    currentConsultation: Consultation;
    history: Array<Consultation>;
}

interface TransformedResult {
    patient: {
        avatar: string;
        height: number;
        weight: number;
        bloodType: string;
        isSmoker: string;
        isAlcoholic: string;
        operations: string;
        bloodTransfusion: string;
        chronicDiseases: string;
        allergies: string;
        name: string;
        surname: string;
        middleName: string;
        birthDate: Date;
        analyzes: Array<{
            id: number;
            name: string;
            type: string;
            path: string;
            analysisDeliveryDate: Date;
        }>;
    };
    currentConsultation: {
        id: number;
        symptoms: string;
    };
    history: Array<{
        id: number;
        receptionDate: Date;
        appointment: string;
        doctor: {
            id: number;
            name: string;
            surname: string;
            middleName: string;
        };
        doctorSpecialty: {
            id: number;
            name: string;
        };
    }>;
}

class PatientInfoForConsultationTransformer extends CoreTransformer {
    public transform = (data: IParam): TransformedResult => {
        const result: TransformedResult = {
            patient: {
                avatar: data.patient.getDataValue('avatar'),
                height: data.patient.getDataValue('height'),
                weight: data.patient.getDataValue('weight'),
                bloodType: data.patient.getDataValue('bloodType'),
                isSmoker: data.patient.getDataValue('isSmoker'),
                isAlcoholic: data.patient.getDataValue('isAlcoholic'),
                operations: data.patient.getDataValue('operations'),
                bloodTransfusion: data.patient.getDataValue('bloodTransfusion'),
                chronicDiseases: data.patient.getDataValue('chronicDiseases'),
                allergies: data.patient.getDataValue('allergies'),
                name: data.patient.getDataValue('name'),
                surname: data.patient.getDataValue('surname'),
                middleName: data.patient.getDataValue('middleName'),
                birthDate: data.patient.getDataValue('birthDate'),
                analyzes: [],
            },
            currentConsultation: {
                id: data.currentConsultation.getDataValue('id'),
                symptoms: data.currentConsultation.getDataValue('symptoms'),
            },
            history: [],
        };

        for (let i = 0; i < data.patient.analyzes.length; i++) {
            result.patient.analyzes.push({
                id: data.patient.analyzes[i].getDataValue('id'),
                name: data.patient.analyzes[i].getDataValue('name'),
                type: data.patient.analyzes[i].getDataValue('type'),
                path: data.patient.analyzes[i].getDataValue('path'),
                analysisDeliveryDate: data.patient.analyzes[i].getDataValue('analysisDeliveryDate'),
            });
        }

        for (let i = 0; i < data.history.length; i++) {
            result.history.push({
                id: data.history[i].getDataValue('id'),
                receptionDate: data.history[i].getDataValue('receptionDate'),
                appointment: data.history[i].getDataValue('appointment'),
                doctor: {
                    id: data.history[i].doctor.getDataValue('id'),
                    name: data.history[i].doctor.user.getDataValue('name'),
                    surname: data.history[i].doctor.user.getDataValue('surname'),
                    middleName: data.history[i].doctor.user.getDataValue('middleName'),
                },
                doctorSpecialty: {
                    id: data.history[i].doctorSpecialty.getDataValue('id'),
                    name: data.history[i].doctorSpecialty.getDataValue('name'),
                },
            });
        }

        return result;
    };
}

export const patientInfoForConsultationTransformer = new PatientInfoForConsultationTransformer();
