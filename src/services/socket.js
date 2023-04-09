import { io } from 'socket.io-client';
import { authHeaderNoBearer } from "./authHeader";

const URL = 'http://localhost:3002';

export const socket = io(URL, {
    autoConnect: false,
    transportOptions: {
        polling: {
          extraHeaders: authHeaderNoBearer(),
        },
    }
});
// code test socket in file App.js
// componentDidMount() {
  //   console.log('socket io');
  //   socket.connect();
  //   console.log('connected', socket.connected);
  //   socket.on('test_message', (data) => { console.log('data', data) });
  //   socket.emit('test_message', { conversationId: null, userReceiveId: '7e3c434f-9643-499c-8fa4-5b932144e00c', content: 'test' })
  // };