import { CoreTask, IResult } from '../../../ship/core/task/CoreTask';
import { consultationRepository } from '../repositories/ConsultationRepository';

class CancelConsultationTask extends CoreTask {
    public run = async (consultationId: number, userId: number): Promise<IResult> => {
        const consultation = await consultationRepository.getConsultationForCancel(
            consultationId,
            userId
        );

        if (!consultation)
            return {
                error: 1,
                message: 'Консультация не найдена',
            };

        try {
            await consultation.update({
                state: 'canceled',
            });
        } catch (e) {
            return {
                error: 2,
                message: 'Ошибка обновлния состояния консультации',
            };
        }

        return {
            error: 0,
            message: 'Консультация отменена',
        };
    };
}

export const cancelConsultationTask = new CancelConsultationTask();
