import { CoreTask } from '../../../ship/core/task/CoreTask';
import { INewMessage } from '../interfaces';

class FailedMessageSendingTask extends CoreTask {
    public run = (message: INewMessage, err: Error, io: SocketIO.Server) => {
        // Берем socket id из Redis (по authorId) и отправляем ему сообщение о том, что сообщение не было доставлено
    };
}

export const failedMessageSendingTask = new FailedMessageSendingTask();
