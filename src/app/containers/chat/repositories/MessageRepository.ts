import { CoreRepository } from '../../../ship/core/repository/CoreRepository';
import { INewMessage } from '../interfaces';

import { Message } from '../models/Message';

class MessageRepository extends CoreRepository {
    constructor() {
        super();
        this.model = Message;
    }

    public appendMessage = (message: INewMessage): Promise<Message> => {
        return this.model.create({
            chatId: message.chatId,
            authorId: message.authorId,
            text: message.text,
        });
    };
}

export const messageRepository = new MessageRepository();
