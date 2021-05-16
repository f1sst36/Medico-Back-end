import Bull, { Job, Queue } from 'bull';
import { app } from '../../../../index';
import { INewMessage } from '../interfaces';
import { Message } from '../models/Message';
import { broadcastMessageToRoomTask } from '../tasks/BroadcastMessageToRoomTask';
import { messageToDBJob } from './jobs/MessageToDBJob';

class MessagesQueue {
    private messagesQueue: Queue;

    public addMessage = (newMessage: INewMessage): void => {
        this.messagesQueue.add('newMessageProcess', newMessage, {
            attempts: 1,
        });
    };

    private failedMessageSending = (message: INewMessage, err: Error) => {
        // Берем socket id из Redis (по authorId) и отправляем ему сообщение о том, что сообщение не было доставлено
    };

    public run = (): Queue => {
        this.messagesQueue = new Bull('messagesQueue', {
            redis: process.env.REDISCLOUD_URL || String(6379),
        });

        this.messagesQueue.process('newMessageProcess', messageToDBJob.run);

        this.messagesQueue.on('completed', async (job: Job, result: Message) => {
            await broadcastMessageToRoomTask.run(result, app.io);
            // Если job удалять, то он не будет оставлять мета инфу в редисе и в админке соответственно.
            // Еще так документация рекомендует
            job.remove();
        });

        this.messagesQueue.on('failed', (job: Job, err: Error) => {
            this.failedMessageSending(job.data, err);
        });

        return this.messagesQueue;
    };
}

export const messagesQueue = new MessagesQueue();
