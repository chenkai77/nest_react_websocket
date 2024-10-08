import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebSocketModule } from './web-socket/web-socket.module';
import { RoomWebSocketModule } from './room/room.module';

@Module({
  imports: [WebSocketModule, RoomWebSocketModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
