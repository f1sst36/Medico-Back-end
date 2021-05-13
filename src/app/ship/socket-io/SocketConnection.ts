import jwt from 'jsonwebtoken';
import { io } from '.';

class SocketConnection {
    private authMiddleware = (socket: any, next: Function): void => {
        if (!socket.handshake.query || !socket.handshake.query.token) next(new Error('Auth error'));

        const verified = jwt.verify(socket.handshake.query.token, process.env.TOKEN_SECRET_KEY);

        if (!verified._expired || new Date(verified._expired) < new Date())
            return next(new Error('Token is expired'));

        socket.user = verified._user;
        next();
    };

    public init = (): void => {
        io.use(this.authMiddleware).on('connection', (socket: any) => {
            console.log('connected');

            socket.emit('authorized', { message: 'Hello from backend', id: socket.id });
        });
    };
}

export const socketConnection = new SocketConnection();
