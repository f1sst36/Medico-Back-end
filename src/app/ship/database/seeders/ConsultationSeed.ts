import { Chat } from '../../../containers/chat/models/Chat';
import { Consultation } from '../../../containers/consultation/models/Consultation';
import { CoreSeed } from './CoreSeed';

export class ConsultationSeed extends CoreSeed {
    private createConsultation = async () => {
        const randomDay = this.randomInt(9, 18);
        const receptionDate = new Date(
            `2021-05-${randomDay < 10 ? '0' + randomDay : randomDay}T${this.randomInt(
                10,
                20
            )}:00:00`
        );

        const patientId = this.randomInt(1, 2);
        const doctorId = this.randomInt(3, 4);

        const chat = await Chat.create({
            patientId: patientId,
            doctorId: doctorId,
        });

        await Consultation.create({
            patientId: patientId,
            doctorId: doctorId,
            chatId: chat.getDataValue('id'),
            communicationMethodId: this.randomInt(1, 3),
            doctorSpecialtyId: this.randomInt(1, 16),
            receptionDate: receptionDate,
            symptoms: 'Такие-то такие-то симптомы ....',
            appointment: receptionDate <= new Date() ? 'Это текст назвачения врача' : null,
            state: receptionDate <= new Date() ? 'done' : 'waiting',
        });
    };

    public run = () => {
        for (let i = 0; i < 10; i++) {
            this.createConsultation();
        }
    };
}
