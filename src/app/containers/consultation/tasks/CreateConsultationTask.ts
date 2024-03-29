import { CoreTask } from '../../../ship/core/task/CoreTask';
import { Consultation } from '../models/Consultation';

interface IParams {
    doctorId: number;
    patientId: number;
    chatId: number;
    doctorSpecialtyId: number;
    receptionDate: Date;
    communicationMethodId: number;
    symptoms: string;
    isFirstConsultation: boolean;
}

class CreateConsultationTask extends CoreTask {
    public run = async (consultationFields: IParams): Promise<Consultation> => {
        try {
            return await Consultation.create(consultationFields);
        } catch (e) {
            console.log(e);
            return null;
        }
    };
}

export const createConsultationTask = new CreateConsultationTask();
