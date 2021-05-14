import Bull, { Job, Queue } from 'bull';
import { INewMessage } from '../interfaces';
import { messageToDBJob } from './jobs/MessageToDBJob';

class MessagesQueue {
    private messagesQueue: Queue;

    public addMessage = (newMessage: INewMessage): void => {
        this.messagesQueue.add('newMessageProcess', newMessage, {
            attempts: 2,
        });
    };

    public run = (): Queue => {
        this.messagesQueue = new Bull('messagesQueue', {
            redis: process.env.REDISCLOUD_URL || String(6379),
        });

        this.messagesQueue.process('newMessageProcess', messageToDBJob.run);

        return this.messagesQueue;
    };
}

export const messagesQueue = new MessagesQueue();
