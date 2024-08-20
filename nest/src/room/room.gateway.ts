import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class RoomWSGateway {
  constructor() {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('joinRoom')
  joinRoom(
    @MessageBody() data: { room: string },
    @ConnectedSocket() client: Socket,
  ) {
    client.join(data.room);
    this.server
      .to(data.room)
      .emit('roomMessage', { message: '欢迎' + client.id + '用户加入' });
  }

  @SubscribeMessage('leaveRoom')
  leaveRoom(
    @MessageBody() data: { room: string },
    @ConnectedSocket() client: Socket,
  ) {
    client.leave(data.room);
    this.server
      .to(data.room)
      .emit('roomMessage', { message: client.id + '用户离开了' });
  }

  @SubscribeMessage('sendMessage')
  sendMessage(@MessageBody() data: { id: string; message: string }) {
    this.server.emit('roomMessage', {
      message: data.id + ': ' + data.message,
    });
  }
}
