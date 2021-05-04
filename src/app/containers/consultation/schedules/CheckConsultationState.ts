import { addHours } from 'date-fns';
import schedule from 'node-schedule';
import { Consultation } from '../models/Consultation';

class CheckConsultationState {
    private waitingConsultations: Array<Consultation> = [];
    private activeConsultations: Array<Consultation> = [];

    private getWaitingConsultations = (): Promise<Array<Consultation>> | any => {
        // запрос в БД
    };

    private getActiveConsultations = (): Promise<Array<Consultation>> | any => {
        // запрос в БД
    };

    public setScheduleJobForConsultation = (
        consultation: Consultation,
        type: string = 'waiting'
    ) => {
        // '2021-05-04T12:24:15.274Z'
        const date =
            type === 'waiting'
                ? consultation.getDataValue('receptionDate')
                : type === 'active'
                ? addHours(consultation.getDataValue('receptionDate'), 1)
                : null;
        try {
            schedule.scheduleJob(date, () => {
                // таск на изменение состояния консультации
                console.log('scheduleJob', new Date());
            });
        } catch (e) {
            console.log('scheduleJob error', e);
            // заново поставить таймер или же отменить консультацию
        }
    };

    public run = async () => {
        await this.getActiveConsultations();
        await this.getWaitingConsultations();

        for (let i = 0; i < this.activeConsultations.length; i++) {
            this.setScheduleJobForConsultation(this.activeConsultations[i], 'active');
        }

        for (let i = 0; i < this.waitingConsultations.length; i++) {
            this.setScheduleJobForConsultation(this.waitingConsultations[i], 'waiting');
        }
    };
}

export const checkConsultationState = new CheckConsultationState();
