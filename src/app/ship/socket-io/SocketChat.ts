import { appendMessageToQueueTask } from '../../containers/chat/tasks/AppendMessageToQueueTask';
import { Socket } from 'socket.io';
import { INewMessage } from '../../containers/chat/interfaces';

class SocketChat {
    // События, которые я отправляю
    public NEW_MESSAGE_SUCCESS = 'newMessage-success';
    public NEW_MESSAGE_ERROR = 'newMessage-error';

    public run = (socket: Socket | any) => {
        // Здесь список событий и методов, которые их обрабатывают
        socket.on('newMessage', (newMessage: INewMessage) =>
            appendMessageToQueueTask.run(newMessage, socket.user.id)
        );
    };
}

export const socketChat = new SocketChat();
