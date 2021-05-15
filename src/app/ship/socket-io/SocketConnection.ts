import jwt from 'jsonwebtoken';
import { Socket } from 'socket.io';
import { CoreSocket } from './CoreSocket';
import { socketChat } from './SocketChat';

class SocketConnection extends CoreSocket {
    private authMiddleware = (socket: any, next: Function): void => {
        return next();

        if (!socket.handshake.query || !socket.handshake.query.token)
            return next(new Error('Auth error'));

        let verified;
        try {
            verified = jwt.verify(socket.handshake.query.token, process.env.TOKEN_SECRET_KEY);
        } catch (e) {
            return next(new Error('Invalid token'));
        }

        if (!verified._expired || new Date(verified._expired) < new Date())
            return next(new Error('Token is expired'));

        socket.user = verified._user;
        return next();
    };

    public init = (io: SocketIO.Server): void => {
        io.use(this.authMiddleware).on('connection', (socket: Socket) => {
            console.log('connection', socket.id);
            // Метод для записи данных в редис

            socket.emit('authorized', { message: 'You are authorized' });

            socketChat.run(socket);

            socket.on('disconnect', () => {
                // Метод для удаления данных из редиса
                console.log('disconnect', socket.id);
            });
        });
    };
}

export const socketConnection = new SocketConnection();
