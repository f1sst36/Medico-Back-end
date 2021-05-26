import { CoreTask } from '../../../ship/core/task/CoreTask';
import { INewMessage } from '../interfaces';
import { messagesQueue } from '../queues/MessagesQueue';

class AppendMessageToQueueTask extends CoreTask {
    public run = (newMessage: INewMessage, authorId: number) => {
        // Валидация на данные должна быть

        messagesQueue.addMessage({
            chatId: newMessage.chatId,
            authorId: newMessage.authorId,
            text: newMessage.text,
            uuid: newMessage.uuid,
        });
    };
}

export const appendMessageToQueueTask = new AppendMessageToQueueTask();
