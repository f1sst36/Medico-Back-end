import { CoreTask } from '../../../ship/core/task/CoreTask';
import { INewMessage } from '../interfaces';
import { messagesQueue } from '../queues/MessagesQueue';

class AppendMessageToQueueTask extends CoreTask {
    public run = (newMessage: INewMessage) => {
        // Валидация на данные должна быть
        
        messagesQueue.addMessage(newMessage);
    };
}

export const appendMessageToQueueTask = new AppendMessageToQueueTask();
