import { consultationRepository } from '../../../containers/consultation/repositories/ConsultationRepository';
import { CoreTask, IResult } from '../../../ship/core/task/CoreTask';
import { patientRepository } from '../repositories/PatientRepository';

class GetPatientInfoForConsultationTask extends CoreTask {
    public run = async (patientId: number, doctorId: number): Promise<IResult> => {
        const consultation = await consultationRepository.consultationByPatientAndDocotrIds(
            patientId,
            doctorId
        );

        if (!consultation)
            return {
                error: 1,
                message: 'Нет прав на получение информации о пациенте',
            };

        const patient = await patientRepository.getPatientInfoForConsultation(patientId);

        if (!patient)
            return {
                error: 2,
                message: 'Пациент не найден',
            };


    };
}

export const getPatientInfoForConsultationTask = new GetPatientInfoForConsultationTask();
