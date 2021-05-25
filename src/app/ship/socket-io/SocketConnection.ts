import util from 'util';
import jwt from 'jsonwebtoken';
import { Socket } from 'socket.io';
import { client } from '../redis';
import { CoreSocket } from './CoreSocket';
import { socketChat } from './SocketChat';
import { app } from '../../../index';

class SocketConnection extends CoreSocket {
    private SOCKET_CONNECTION_IDS_LIST: string = 'socketConnectionIds';

    private authMiddleware = (socket: any, next: Function): void => {
        // return next();

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

    private createRedisListForSocketIds = async (): Promise<void> => {
        await util
            .promisify(client.del)
            .bind(client)(this.SOCKET_CONNECTION_IDS_LIST)
            .catch((err: any): void => {
                console.log('createRedisListForSocketIds del', err);
            });
        await util
            .promisify(client.hmset)
            .bind(client)([this.SOCKET_CONNECTION_IDS_LIST, '-1', '-1'])
            .catch((err: any): void => {
                console.log('createRedisListForSocketIds hmset', err);
            });
    };

    public addSocketIdToRedis = async (userId: number, socketId: string): Promise<boolean> => {
        const id = await util.promisify(client.hget).bind(client)(
            this.SOCKET_CONNECTION_IDS_LIST,
            userId
        );
        // Если такой id юзера уже есть в редисе, то разрываем соединение
        if (id) {
            app.io.sockets.connected[socketId].disconnect();
            return false;
        }

        await util.promisify(client.hset).bind(client)(
            this.SOCKET_CONNECTION_IDS_LIST,
            userId,
            socketId
        );

        return true;
    };

    public removeSocketIdFromRedis = async (userId: number): Promise<any> => {
        return await util.promisify(client.hdel).bind(client)(
            this.SOCKET_CONNECTION_IDS_LIST,
            userId
        );
    };

    public init = (io: SocketIO.Server): void => {
        this.createRedisListForSocketIds();

        // socket: Socket
        io.use(this.authMiddleware).on('connection', async (socket: any) => {
            try {
                // console.log('connection', socket.user.id, socket.id);
                // Метод для записи данных в редис
                // TODO
                const isAddedSocketId: boolean = await this.addSocketIdToRedis(
                    socket.user.id,
                    socket.id
                );
                // await this.addSocketIdToRedis(1, socket.id);

                if (isAddedSocketId) {
                    // TODO
                    // При коннекте сделай проверку на существование у юзера активных консультаций
                    // и если такие есть - шли ему сокетами уведомление, chatId, currentCommunicationMethodId, isOpenedAccess и может что-то еще
                    // на каждую активную консультацию
                }
            } catch (e) {
                socket.disconnect();
                return;
            }

            // socket.emit('authorized', { message: 'You are authorized' });

            socketChat.run(socket);

            socket.on('disconnect', async () => {
                console.log('disconnect', socket.id);
                // Метод для удаления данных из редиса
                // TODO
                await this.removeSocketIdFromRedis(socket.user.id);
                // await this.removeSocketIdFromRedis(1);
            });
        });
    };
}

export const socketConnection = new SocketConnection();
