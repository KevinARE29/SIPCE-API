import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ namespace: 'requests' })
export class RequestGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private logger: Logger = new Logger('RequestGateway');

  @WebSocketServer()
  server!: Server;

  afterInit() {
    this.logger.log('Request Gateway Initialized!');
  }

  handleConnection(client: Socket) {
    const {
      id,
      handshake: {
        query: { username: room },
      },
    } = client;

    client.join(room);
    client.emit('joinedRoom', room);
    this.logger.log(`Client connected: ${id} to room: ${room}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client diconnected: ${client.id}`);
  }

  // TODO: Define if the handleRoomJoin method will be necessary
  /* @SubscribeMessage('joinRoom')
  handleRoomJoin(client: Socket, room: string ) {
    client.join(room);
    client.emit('joinedRoom', room);
  } */

  @SubscribeMessage('leaveRoom')
  handleRoomLeave(client: Socket, room: string) {
    client.leave(room);
    client.emit('leftRoom', room);
    this.logger.log(`Client disconnected: ${client.id} from room: ${room}`);
  }

  alertCounselor(room: string): void {
    this.logger.log(`Alert to counselor: ${room}`);
    this.server.to(room).emit('newRequest');
  }
}
