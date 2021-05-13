import { app } from '../../../index';

export const io: SocketIO.Server = require('socket.io')(app.server);
