import io from 'socket.io-client';
import { ISession } from '../../../common/src';

const SocketService = () => {
  const socket = io(process.env.SERVER);
  socket.on('connect', () => {
    console.log('Socket.io - connected');
  });
  socket.on('games', (data: ISession) => console.table(data));
  return socket;
};

export const socketSvc = SocketService();
