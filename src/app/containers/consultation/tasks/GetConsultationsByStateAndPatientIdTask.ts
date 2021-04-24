import { CoreTask, IResult } from '../../../ship/core/task/CoreTask';
import { consultationRepository } from '../repositories/ConsultationRepository';

class GetConsultationsByStateAndPatientIdTask extends CoreTask {
    public run = async (consultationState: string, patientId: number): Promise<IResult> => {
        const consultations = await consultationRepository.getConsultationsByStateAndPatientId(
            consultationState,
            patientId
        );

        if (!consultations || !consultations.length) {
            return {
                error: 1,
                message: 'Консультации не найдены',
            };
        }

        return {
            error: 0,
            data: consultations,
            message: '',
        };
    };
}

export const getConsultationsByStateAndPatientIdTask = new GetConsultationsByStateAndPatientIdTask();
