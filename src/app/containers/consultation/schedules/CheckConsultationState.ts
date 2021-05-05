import util from 'util';
import { client } from '../../../ship/redis';

import { addHours } from 'date-fns';
import schedule from 'node-schedule';
import { Consultation } from '../models/Consultation';
import { consultationRepository } from '../repositories/ConsultationRepository';

class CheckConsultationState {
    // Длительность консультации в часах
    private consultationDuration: number = 1;

    private getConsultationsByState = async (state: string): Promise<Array<Consultation>> => {
        const consultations = await consultationRepository.getAllConsultationsForRedisByState(
            state
        );

        if (!consultations || !consultations.length) return null;

        return consultations;
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

        //86400
        client.expire(listName, 60 * 60 * 24);
        // Установка времени жизни ключа 24 часа

        console.log(list);
    };

    private checkConsultationsDate = async (listName: string) => {
        // try {
        //     list = await util.promisify(client.hgetall)(listName);
        // } catch (e) {
        //     console.log("promisify error", e);
        //     return;
        // }

        client.hgetall(listName, (err, reply) => {
            if (err) throw err;

            // Если в редисе пусто
            if (!reply) return;

            //80 Fri May 14 2021 10:00:00 GMT+0300 (GMT+03:00) - так лежит в редисе
            //80 2021-05-14T07:00:00.000Z - так после new Date()

            for (let key in reply) {
                if (new Date(reply[key]) < new Date()) {
                    this.changeConsultationState(+key);
                    console.log(key, new Date(reply[key]));
                }
            }
        });
    };

    private changeConsultationState = async (consultationId: number) => {
        const consultation = await consultationRepository.getConsultationForRedisById(
            consultationId
        );

        if (!consultation) return;

        const nextState =
            consultation.getDataValue('state') === 'waiting'
                ? 'active'
                : consultation.getDataValue('state') === 'active'
                ? 'done'
                : 'error';
        try {
            await consultation.update({
                state: nextState,
            });

            // Необходимо удалить запись о 'waiting' консультации из редис списка и
            // создать новую запись в 'active' списке (в случае перехода от 'waiting' до 'active')

            // В случае перехода от 'active' до 'done', необходимо удалить запись в 'active' списке редиса

            // Добавлять новые (только что созданные) консультации в 'waiting' список редиса
        } catch (e) {
            console.log('changeConsultationState error', e);
        }
    };

    // Этот метод run (а точнее то, что в секции try), необходимо вызывать раз в сутки (в 12 часов ночи). 
    // Перед этим надо почистить редис
    public run = async () => {
        // По идее редис автоматом почистит все с одинаковым ключем ('waitingConsultations' или 'activeConsultations') 
        // при вызове метода 'client.hmset()',
        // но возможно лучше почистить самому

        const activeConsultations = await this.getConsultationsByState('active');
        const waitingConsultations = await this.getConsultationsByState('waiting');

        try {
            this.setListToRedis('waitingConsultations', waitingConsultations, 'waiting');
            this.setListToRedis('activeConsultations', activeConsultations, 'active');
        } catch (e) {
            console.log('Redis error', e);
        }

        const job = schedule.scheduleJob('15 * * * * *', () => {
            this.checkConsultationsDate('waitingConsultations');
        });

        // job.cancel();
    };
}

export const checkConsultationState = new CheckConsultationState();
