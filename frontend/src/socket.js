import { io } from 'socket.io-client';

const socket = io(process.env.NODE_ENV === 'production'
  ? 'wss://frontend-project-1-2y5w.onrender.com'
  : 'ws://localhost:5001', {
  transports: ['websocket'],
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  randomizationFactor: 0.5,
  pingInterval: 25000,
  pingTimeout: 60000,
});

export default socket;
