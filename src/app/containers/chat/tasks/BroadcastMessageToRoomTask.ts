import { socketChat } from '../../../ship/socket-io/SocketChat';
import { CoreTask } from '../../../ship/core/task/CoreTask';
import { Message } from '../models/Message';
import { User } from '../../../containers/user/models/User';

class BroadcastMessageToRoomTask extends CoreTask {
    public run = async (
        data: {
            user: User;
            message: Message;
        },
        io: SocketIO.Server
    ): Promise<void> => {
        // Юзер не в комнате
        // TODO - раскомменти строку как сделаешь механизм добаления юзера в комнаты
        // app.io.to(message.getDataValue('chatId')).emit(socketChat.NEW_MESSAGE_SUCCESS, {

        io.emit(socketChat.NEW_MESSAGE_SUCCESS, {
            id: data.message.getDataValue('id'),
            chatId: data.message.getDataValue('chatId'),
            text: data.message.getDataValue('text'),
            createdAt: data.message.getDataValue('createdAt'),
            user: {
                id: data.user.getDataValue('id'),
                avatar: data.user.getDataValue('avatar'),
                name: data.user.getDataValue('name'),
            },
        });
    };
}

export const broadcastMessageToRoomTask = new BroadcastMessageToRoomTask();
