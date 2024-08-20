import { Module } from '@nestjs/common';
import { RoomWSGateway } from './room.gateway';

@Module({
  providers: [RoomWSGateway],
})
export class RoomWebSocketModule {}
