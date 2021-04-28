import { CoreTask, IResult } from '../../../ship/core/task/CoreTask';
import { consultationRepository } from '../repositories/ConsultationRepository';

class GetDoctorsAppointmentsByPatientIdTask extends CoreTask {
    public run = async (patientId: number): Promise<IResult> => {
        const consultations = await consultationRepository.getAppointmentsOfConsultationByPatientId(
            patientId
        );

        if (!consultations || !consultations.length)
            return {
                error: 1,
                message: 'Назначения не найдены',
            };

        return {
            error: 0,
            data: consultations,
        };
    };
}

export const getDoctorsAppointmentsByPatientIdTask = new GetDoctorsAppointmentsByPatientIdTask();
