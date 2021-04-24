import { Consultation } from '../../../containers/consultation/models/Consultation';
import { CoreSeed } from './CoreSeed';

export class ConsultationSeed extends CoreSeed {
    private createConsultation = async () => {
        const receptionDate = new Date(
            `2021-04-${this.randomInt(17, 30)}T${this.randomInt(10, 18)}:00:00`
        );

        await Consultation.create({
            patientId: this.randomInt(1, 2),
            doctorId: this.randomInt(3, 20),
            communicationMethodId: this.randomInt(1, 3),
            doctorSpecialtyId: this.randomInt(1, 16),
            receptionDate: receptionDate,
            symptoms: 'Такие-то такие-то симптомы ....',
            state: receptionDate <= new Date() ? 'done' : 'waiting',
        });
    };

    public run = () => {
        for (let i = 0; i < 80; i++) {
            this.createConsultation();
        }
    };
}
