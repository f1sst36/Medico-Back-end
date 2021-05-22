import { appendMessageToQueueTask } from '../../containers/chat/tasks/AppendMessageToQueueTask';
import { Socket } from 'socket.io';

class SocketChat {
    // События, которые я отправляю
    public NEW_MESSAGE_SUCCESS = 'newMessage-success';
    public NEW_MESSAGE_ERROR = 'newMessage-error';

    public run = (socket: Socket) => {
        // Здесь список событий и методов, которые их обрабатывают
        socket.on('newMessage', appendMessageToQueueTask.run);
    };
}

export const socketChat = new SocketChat();
