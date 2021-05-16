import { appendMessageToQueueTask } from '../../containers/chat/tasks/AppendMessageToQueueTask';
import { Socket } from 'socket.io';

class SocketChat {
    public NEW_MESSAGE_EVENT = 'newMessage';

    public run = (socket: Socket) => {
        // Здесь список событий и методов, которые их обрабатывают
        socket.on('sendMessage', appendMessageToQueueTask.run);
    };
}

export const socketChat = new SocketChat();
