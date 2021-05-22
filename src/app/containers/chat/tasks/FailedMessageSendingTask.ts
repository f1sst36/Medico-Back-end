import { client } from '../../../ship/redis';
import util from 'util';
import { CoreTask } from '../../../ship/core/task/CoreTask';
import { INewMessage } from '../interfaces';
import { socketChat } from '../../../ship/socket-io/SocketChat';

class FailedMessageSendingTask extends CoreTask {
    private SOCKET_CONNECTION_IDS_LIST: string = 'socketConnectionIds';

    public run = async (message: INewMessage, err: Error, io: SocketIO.Server): Promise<void> => {
        // Берем socket id из Redis (по authorId) и отправляем ему сообщение о том, что сообщение не было доставлено

        let socketId: string;
        try {
            socketId = await util.promisify(client.hget).bind(client)(
                this.SOCKET_CONNECTION_IDS_LIST,
                message.authorId
            );
        } catch (e) {
            console.log('FailedMessageSendingTask', e);
            return null;
        }

        io.to(socketId).emit(socketChat.NEW_MESSAGE_ERROR, {
            error: 1,
            data: message,
        });
    };
}

export const failedMessageSendingTask = new FailedMessageSendingTask();
