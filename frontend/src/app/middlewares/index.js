import loggerMiddleware from './logger.js/loggerMiddleware';
import socketMiddleware from './socket/socketMiddleware';
import socket from '../../socket';

export default [loggerMiddleware, socketMiddleware(socket)];
