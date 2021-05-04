import { client } from '../../../ship/redis';

import { addHours } from 'date-fns';
import schedule from 'node-schedule';
import { Consultation } from '../models/Consultation';
import { consultationRepository } from '../repositories/ConsultationRepository';

// console.log(client);

// client.setex('abc', 60 * 60 * 24, JSON.stringify({ abc: 1, b: 2, c: { qwe: 'qwe' } }));

// client.get('abc', (err, reply) => {
//     if (err) return null;

//     console.log(reply, JSON.parse(reply));
// });

class CheckConsultationState {
    // Длительность консультации в часах
    private consultationDuration: number = 1;
    private waitingConsultations: Array<Consultation> = [];
    private activeConsultations: Array<Consultation> = [];

    private getWaitingConsultations = async (): Promise<Array<Consultation>> => {
        const consultations = await consultationRepository.getAllConsultationsForRedisByState(
            'waiting'
        );

        if (!consultations || !consultations.length) return null;

        return consultations;
    };

    private getActiveConsultations = (): Promise<Array<Consultation>> | any => {
        // запрос в БД
    };

    private setListToRedis = (
        listName: string,
        consultations: Array<Consultation>,
        state: string = 'waiting'
    ) => {
        if (!consultations || !consultations.length) return;

        const list: Array<string> = [listName];

        for (let i = 0; i < consultations.length; i++) {
            const date =
                state === 'active'
                    ? addHours(
                          consultations[i].getDataValue('receptionDate'),
                          this.consultationDuration
                      )
                    : consultations[i].getDataValue('receptionDate');

            list.push(consultations[i].getDataValue('id'));
            list.push(date);
        }

        client.hmset(list, (err, _) => {
            if (err) throw err;
        });
        // Установи время жизни ключа 24 часа

        console.log(list);
    };

    // public setScheduleJobForConsultation = (
    //     consultation: Consultation,
    //     type: string = 'waiting'
    // ) => {
    //     // '2021-05-04T12:24:15.274Z'
    //     const date =
    //         type === 'waiting'
    //             ? consultation.getDataValue('receptionDate')
    //             : type === 'active'
    //             ? addHours(consultation.getDataValue('receptionDate'), 1)
    //             : null;
    //     try {
    //         schedule.scheduleJob(date, () => {
    //             // таск на изменение состояния консультации
    //             console.log('scheduleJob', new Date());
    //         });
    //     } catch (e) {
    //         console.log('scheduleJob error', e);
    //         // заново поставить таймер или же отменить консультацию
    //     }
    // };

    public run = async () => {
        const activeConsultations = await this.getActiveConsultations();
        const waitingConsultations = await this.getWaitingConsultations();

        try {
            this.setListToRedis('waitingConsultations', waitingConsultations, 'waiting');
            this.setListToRedis('activeConsultations', activeConsultations, 'active');
        } catch (e) {
            console.log('Redis error', e);
        }

        const job = schedule.scheduleJob('15 * * * * *', function () {
            console.log('The answer to life, the universe, and everything!');
        });
    };
}

export const checkConsultationState = new CheckConsultationState();
