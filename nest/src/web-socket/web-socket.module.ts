import { Module } from '@nestjs/common';
import { WSGateway } from './web-socket.gateway';

@Module({
  providers: [WSGateway],
})
export class WebSocketModule {}
