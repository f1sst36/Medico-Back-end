import util from 'util';
import { client } from '../../../ship/redis';
import { CoreTask, IResult } from '../../../ship/core/task/CoreTask';
import { Consultation } from '../models/Consultation';

class WriteConsultationsToRedisTask extends CoreTask {
    private WAITING_LIST_NAME: string = 'consultations:waiting';

    public run = async (consultation: Consultation): Promise<IResult> => {
        try {
            await util.promisify(client.hset).bind(client)(
                this.WAITING_LIST_NAME,
                consultation.getDataValue('id'),
                consultation.getDataValue('receptionDate')
            );
        } catch (e) {
            return {
                error: 1,
                message: 'Ошибка записи на консультацию',
            };
        }

        return {
            error: 0,
            message: '',
        };
    };
}

export const writeConsultationsToRedisTask = new WriteConsultationsToRedisTask();
