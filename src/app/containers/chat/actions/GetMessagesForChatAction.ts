import { CoreAction, IResult } from '../../../ship/core/action/CoreAction';
import { Chat } from '../models/Chat';
import { Message } from '../models/Message';
import { chatRepository } from '../repositories/ChatRepository';
import { messageRepository } from '../repositories/MessageRepository';

class GetMessagesForChatAction extends CoreAction {
    public run = async (
        userId: number,
        chatId: number,
        count: number,
        lastMessageId: number = null
    ): Promise<IResult> => {
        let chat: Chat;
        let messages: Array<Message>;
        try {
            // Проверка доступа юзера к чату
            chat = await chatRepository.isUserHasChat(userId, chatId);

            if (!chat)
                return {
                    error: 1,
                    message: 'У вас нет доступа к данному чату',
                };

            messages = await messageRepository.getMessagesForChat(chatId, count, lastMessageId);
        } catch (e) {
            return {
                error: 2,
                message: 'Ошибка получения данных из БД',
            };
        }

        return {
            error: 0,
            data: messages,
        };
    };
}

export const getMessagesForChatAction = new GetMessagesForChatAction();
