import util from 'util';
import { client } from '../../../ship/redis';

import { addHours } from 'date-fns';
import schedule from 'node-schedule';
import { Consultation } from '../models/Consultation';
import { consultationRepository } from '../repositories/ConsultationRepository';

class CheckConsultationState {
    // Длительность консультации в часах
    private consultationDuration: number = 1;

    private WAITING_LIST_NAME: string = 'consultations:waiting';
    private ACTIVE_LIST_NAME: string = 'consultations:active';

    private checkRedisJob: any;

    // Метод вызывается когда консультация изменила свое состояние на 'active'
    private consultationToActiveTrigger = (consultation: Consultation) => {
        console.log('consultationToActiveTrigger', consultation);
    };

    // Метод вызывается когда консультация изменила свое состояние на 'done'
    private consultationToDoneTrigger = (consultation: Consultation) => {
        console.log('consultationToDoneTrigger', consultation);
    };

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
        // console.log('consultations', consultations);

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

        // console.log('list', list);

        client.hmset(list, (err, _) => {
            if (err) throw err;

            //86400
            client.expire(listName, 60 * 60 * 24);
            // Установка времени жизни ключа 24 часа
        });

        // console.log(list);
    };

    private checkConsultationsDate = async (listName: string) => {
        let reply;
        try {
            reply = await util.promisify(client.hgetall).bind(client)(listName);
        } catch (e) {
            console.log('checkConsultationsDate', e);
            return;
        }

        // console.log(listName, reply);
        // console.log('currentDate', new Date());

        // Если в редисе пусто
        if (!reply) return;

        // console.log(`${listName} - reply`, reply);

        //80 Fri May 14 2021 10:00:00 GMT+0300 (GMT+03:00) - так лежит в редисе
        //80 2021-05-14T07:00:00.000Z - так после new Date()
        for (let key in reply) {
            if (new Date(reply[key]) < new Date()) {
                await this.changeConsultationState(+key);
                // console.log(key, new Date(reply[key]));
            }
        }
    };

    private changeConsultationState = async (consultationId: number) => {
        const consultation = await consultationRepository.getConsultationForRedisById(
            consultationId
        );

        if (!consultation) return;

        const currentState = consultation.getDataValue('state');
        const nextState =
            currentState === 'waiting' ? 'active' : currentState === 'active' ? 'done' : 'error';

        try {
            if (
                currentState === 'canceled' ||
                currentState === 'done' ||
                currentState === 'error'
            ) {
                await util.promisify(client.hdel).bind(client)(
                    this.WAITING_LIST_NAME,
                    consultation.getDataValue('id')
                );

                await util.promisify(client.hdel).bind(client)(
                    this.ACTIVE_LIST_NAME,
                    consultation.getDataValue('id')
                );

                return;
            }

            await consultation.update({
                state: nextState,
            });

            if (nextState === 'active') {
                await util.promisify(client.hdel).bind(client)(
                    this.WAITING_LIST_NAME,
                    consultation.getDataValue('id')
                );

                await util.promisify(client.hset).bind(client)(
                    this.ACTIVE_LIST_NAME,
                    consultation.getDataValue('id'),
                    addHours(consultation.getDataValue('receptionDate'), this.consultationDuration)
                );

                // Метод вызывается когда консультация изменила свое состояние на 'active'
                this.consultationToActiveTrigger(consultation);
            } else if (nextState === 'done' || nextState === 'error') {
                await util.promisify(client.hdel).bind(client)(
                    this.ACTIVE_LIST_NAME,
                    consultation.getDataValue('id')
                );

                // Метод вызывается когда консультация изменила свое состояние на 'done'
                this.consultationToDoneTrigger(consultation);
            }

            // Необходимо удалить запись о 'waiting' консультации из редис списка и
            // создать новую запись в 'active' списке (в случае перехода от 'waiting' до 'active') (Сделано)

            // В случае перехода от 'active' до 'done', необходимо удалить запись в 'active' списке редиса (Сделано)

            // Добавлять новые (только что созданные) консультации в 'waiting' список редиса
        } catch (e) {
            console.log('changeConsultationState error', e);
        }
    };

    private refreshRedisLists = async () => {
        await util.promisify(client.del).bind(client)(this.WAITING_LIST_NAME);
        await util.promisify(client.del).bind(client)(this.ACTIVE_LIST_NAME);

        const activeConsultations = await this.getConsultationsByState('active');
        const waitingConsultations = await this.getConsultationsByState('waiting');

        try {
            this.setListToRedis(this.WAITING_LIST_NAME, waitingConsultations, 'waiting');
            this.setListToRedis(this.ACTIVE_LIST_NAME, activeConsultations, 'active');
        } catch (e) {
            console.log('Redis error', e);
        }
    };

    private syncTimer = async (): Promise<void> => {
        await this.refreshRedisLists();

        if (this.checkRedisJob) this.checkRedisJob.cancel();

        this.checkRedisJob = schedule.scheduleJob('30 * * * * *', async () => {
            console.log('job');

            await this.checkConsultationsDate(this.WAITING_LIST_NAME);
            await this.checkConsultationsDate(this.ACTIVE_LIST_NAME);
        });
    };

    // Этот метод run (а точнее то, что в секции try), необходимо вызывать раз в сутки (в 12 часов ночи).
    // Перед этим надо почистить редис
    public run = async () => {
        // По идее редис автоматом почистит все с одинаковым ключем ('consultations:waiting' или 'consultations:active')
        // при вызове метода 'client.hmset()',
        // но возможно лучше почистить самому

        await this.syncTimer();

        const dayJob = schedule.scheduleJob('0 */6 * * *', async () => {
            // console.log('dayJob');
            this.syncTimer();
        });
    };
}

export const checkConsultationState = new CheckConsultationState();
