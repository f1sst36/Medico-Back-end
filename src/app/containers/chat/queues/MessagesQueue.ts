import Bull, { Job, Queue } from 'bull';
import { app } from '../../../../index';
import { INewMessage } from '../interfaces';
import { Message } from '../models/Message';
import { messageToDBJob } from './jobs/MessageToDBJob';

class MessagesQueue {
    private messagesQueue: Queue;

    public addMessage = (newMessage: INewMessage): void => {
        this.messagesQueue.add('newMessageProcess', newMessage, {
            attempts: 1,
        });
    };

    public broadcastMessageToRoom = (message: Message) => {
        // Юзер не в комнате
        // app.io.to(message.getDataValue('chatId')).emit('newMessage', {
        app.io.emit('newMessage', {
            id: message.getDataValue('id'),
            authorId: message.getDataValue('authorId'),
            text: message.getDataValue('text'),
            createdAt: message.getDataValue('createdAt'),
        });
    };

    public run = (): Queue => {
        this.messagesQueue = new Bull('messagesQueue', {
            redis: process.env.REDISCLOUD_URL || String(6379),
        });

        this.messagesQueue.process('newMessageProcess', messageToDBJob.run);

        this.messagesQueue.on('completed', (job: Job, result: Message) => {
            // console.log('complited', result);
            this.broadcastMessageToRoom(result);
            // Если job удалять, то он не будет оставлять мета инфу в редисе и в админке соответственно.
            // Еще так документация рекомендует
            job.remove();
        });

        this.messagesQueue.on('failed', (job: Job, err: Error) => {
            // console.log('failed', job, err);
        });

        return this.messagesQueue;
    };
}

export const messagesQueue = new MessagesQueue();
