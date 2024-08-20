import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class WSGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor() {}

  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    this.server.emit('chatMessage', {
      message: client.id + ' 上线了',
    });
  }

  handleDisconnect(client: Socket) {
    this.server.emit('chatMessage', {
      message: client.id + ' 离线了',
    });
  }

  @SubscribeMessage('userMessage')
  sendMessage(@MessageBody() data: { id: string; message: string }) {
    this.server.emit('chatMessage', {
      message: data.id + ': ' + data.message,
    });
  }
}
