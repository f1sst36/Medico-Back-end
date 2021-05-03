import { CoreAction, IResult } from '../../../ship/core/action/CoreAction';
import { consultationRepository } from '../repositories/ConsultationRepository';

class AddAppointmentForPatientAction extends CoreAction {
    public run = async (
        doctorId: number,
        patientId: number,
        consultationId: number,
        appointmentText: string
    ): Promise<IResult> => {
        const consultation = await consultationRepository.getWaitingOrActiveConsultationByIds(
            doctorId,
            patientId,
            consultationId
        );

        if (!consultation)
            return {
                error: 1,
                message: 'Недостаточно прав на выполнение метода',
            };

        try {
            await consultation.update({
                appointment: appointmentText,
            });
        } catch (e) {
            return {
                error: 2,
                message: 'Ошибка добавления назначения',
            };
        }

        return {
            error: 0,
            data: null,
        };
    };
}

export const addAppointmentForPatientAction = new AddAppointmentForPatientAction();
