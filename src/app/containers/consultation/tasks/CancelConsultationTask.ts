import { CoreTask, IResult } from '../../../ship/core/task/CoreTask';
import { consultationRepository } from '../repositories/ConsultationRepository';
import { deleteConsultationFromRedisTask } from './DeleteConsultationFromRedisTask';

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

            await deleteConsultationFromRedisTask.run(consultation.getDataValue('id'));
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
