import { CommunicationMethod } from '../../../containers/consultation/models/CommunicationMethod';
import { CoreSeed } from './CoreSeed';

export class CommunicationMethodSeed extends CoreSeed {
    public run = () => {
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

        CommunicationMethod.bulkCreate(this.records);
    };
}
