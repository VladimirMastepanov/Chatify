import { addOneChannel, removeOneChannel, renameOneChannel } from '../../../slices/channels/channelsSlice';
import { addOneMessage } from '../../../slices/messages/messagesSlice';

const socketMiddleware = (socket) => ({ dispatch }) => {
  if (!socket) {
    console.error('Socket instance is not provided');
    return (next) => (action) => next(action);
  }
  if (typeof socket.on !== 'function') {
    console.error('socket.on is not a function');
    return (next) => (action) => next(action);
  }
  socket.on('newMessage', (payload) => {
    console.log('Received newMessage:', payload);
    dispatch(addOneMessage(payload));
  });

  socket.on('newChannel', (payload) => {
    dispatch(addOneChannel(payload));
  });

  socket.on('removeChannel', (payload) => {
    dispatch(removeOneChannel(payload.id));
  });

  socket.on('renameChannel', (payload) => {
    const { id, ...changes } = payload;
    dispatch(renameOneChannel({ id, changes }));
  });

  return (next) => (action) => next(action);
};

export default socketMiddleware;
