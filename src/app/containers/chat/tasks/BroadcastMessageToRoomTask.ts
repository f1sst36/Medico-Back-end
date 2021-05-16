import { socketChat } from '../../../ship/socket-io/SocketChat';
import { CoreTask } from '../../../ship/core/task/CoreTask';
import { Message } from '../models/Message';

class BroadcastMessageToRoomTask extends CoreTask {
    public run = async (message: Message, io: SocketIO.Server): Promise<void> => {
        // Юзер не в комнате
        // TODO - раскомменти строку как сделаешь механизм добаления юзера в комнаты
        // app.io.to(message.getDataValue('chatId')).emit(socketChat.NEW_MESSAGE_EVENT, {

        io.emit(socketChat.NEW_MESSAGE_EVENT, {
            id: message.getDataValue('id'),
            authorId: message.getDataValue('authorId'),
            text: message.getDataValue('text'),
            createdAt: message.getDataValue('createdAt'),
        });
    };
}

export const broadcastMessageToRoomTask = new BroadcastMessageToRoomTask();
