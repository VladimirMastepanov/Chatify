import { addOneMessage } from '../../../features/messages/messagesSlice';
import { addOneChannel, removeOneChannel, renameOneChannel } from '../../../features/channels/channelsSlice';

const socketMiddleware = (socket) => ({ dispatch }) => {
  socket.on('newMessage', (payload) => {
    dispatch(addOneMessage(payload));
  });

  socket.on('newChannel', (payload) => {
    dispatch(addOneChannel(payload));
  });

  socket.on('removeChannel', (payload) => {
    dispatch.removeOneChannel(payload.id);
  });

  socket.on('renameChannel', (payload) => {
    const { id, ...rest } = payload;
    dispatch.renameOneChannel({ id, changes: rest });
  });

  return (next) => (action) => next(action);
};

export default socketMiddleware;
