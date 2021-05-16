import { CoreAction, IResult } from '../../../ship/core/action/CoreAction';
import { Chat } from '../models/Chat';
import { chatRepository } from '../repositories/ChatRepository';

class GetChatListAction extends CoreAction {
    public run = async (userId: number, userType: string): Promise<IResult> => {
        let chats: Array<Chat>;
        try {
            chats = await chatRepository.getChatList(userId, userType);
        } catch (e) {
            console.log(e);
            return {
                error: 1,
                message: 'Ошибка при запросе к БД',
            };
        }

        return {
            error: 0,
            data: chats,
        };
    };
}

export const getChatListAction = new GetChatListAction();
