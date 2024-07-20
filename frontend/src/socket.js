import { io } from 'socket.io-client';

const socket = io('http://localhost:3000', {
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  randomizationFactor: 0.5,
  pingInterval: 25000,
  pingTimeout: 60000,
});

export default socket;
