import { consultationRepository } from '../../../containers/consultation/repositories/ConsultationRepository';
import { CoreTask, IResult } from '../../../ship/core/task/CoreTask';
import { patientRepository } from '../repositories/PatientRepository';

class GetPatientInfoForConsultationTask extends CoreTask {
    public run = async (
        patientId: number,
        doctorId: number,
        consultationId: number
    ): Promise<IResult> => {
        const consultation = await consultationRepository.consultationByPatientAndDocotrIds(
            patientId,
            doctorId,
            consultationId
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

        const pastPatientConsultations = await consultationRepository.pastPatientConsultations(
            patientId
        );

        if (!pastPatientConsultations)
            return {
                error: 3,
                message: 'Ошибка получения консультаций',
            };

        return {
            error: 0,
            data: {
                patient: patient,
                currentConsultation: consultation,
                history: pastPatientConsultations,
            },
        };
    };
}

export const getPatientInfoForConsultationTask = new GetPatientInfoForConsultationTask();
