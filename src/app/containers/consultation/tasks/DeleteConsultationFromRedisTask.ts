import util from 'util';
import { client } from '../../../ship/redis';
import { CoreTask, IResult } from '../../../ship/core/task/CoreTask';

class DeleteConsultationFromRedisTask extends CoreTask {
    private WAITING_LIST_NAME: string = 'consultations:waiting';

    public run = async (consultationId: number): Promise<IResult> => {
        try {
            await util.promisify(client.hdel).bind(client)(this.WAITING_LIST_NAME, consultationId);
        } catch (e) {
            return {
                error: 1,
                message: 'Ошибка удаления консультации',
            };
        }

        return {
            error: 0,
            message: '',
        };
    };
}

export const deleteConsultationFromRedisTask = new DeleteConsultationFromRedisTask();
