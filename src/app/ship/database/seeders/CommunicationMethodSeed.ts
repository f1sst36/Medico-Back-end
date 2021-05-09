import { CommunicationMethod } from '../../../containers/consultation/models/CommunicationMethod';
import { CoreSeed } from './CoreSeed';

export class CommunicationMethodSeed extends CoreSeed {
    public run = async (): Promise<void> => {
        this.records = [
            {
                method: 'Сообщения в чате',
            },
            {
                method: 'Аудиозвонок',
            },
            {
                method: 'Видеозвонок',
            },
        ];

        await CommunicationMethod.bulkCreate(this.records);
    };
}
