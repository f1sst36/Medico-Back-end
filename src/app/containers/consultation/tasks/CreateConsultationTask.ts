import { CoreTask } from '../../../ship/core/task/CoreTask';
import { Consultation } from '../models/Consultation';

interface IParams {
    doctorId: Number;
    patientId: Number;
    receptionDate: Date;
    communicationMethodId: Number;
    symptoms: String;
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
