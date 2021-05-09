import { CoreTransformer } from '../../../ship/core/transformer/CoreTransformer';
import { Patient } from '../models/Patient';

interface ITransformedResult {
    weight: number;
    height: number;
    bloodType: string;
    RHFactor: string;
    allergies: string;
    chronicDiseases: string;
    operations: string;
    isSmoker: string;
    isAlcoholic: string;
    badHabits: string;
    bloodTransfusion: string;
}

class ChangeMedicalCardTransformer extends CoreTransformer {
    public transform = (patient: Patient): ITransformedResult => {
        return {
            weight: patient.getDataValue('weight'),
            height: patient.getDataValue('height'),
            bloodType: patient.getDataValue('bloodType'),
            RHFactor: patient.getDataValue('RHFactor'),
            allergies: patient.getDataValue('allergies'),
            chronicDiseases: patient.getDataValue('chronicDiseases'),
            operations: patient.getDataValue('operations'),
            isSmoker: patient.getDataValue('isSmoker'),
            isAlcoholic: patient.getDataValue('isAlcoholic'),
            badHabits: patient.getDataValue('badHabits'),
            bloodTransfusion: patient.getDataValue('bloodTransfusion'),
        };
    };
}

export const changeMedicalCardTransformer = new ChangeMedicalCardTransformer();
