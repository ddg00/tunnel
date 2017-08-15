import * as console from 'console';
import * as WebSocket from 'ws';
import { WebSocketAdapter } from '@nestjs/common';
import { MessageMappingProperties } from '@nestjs/websockets';

export class WsAdapter implements WebSocketAdapter {
    public create(port: number) {
        return new WebSocket.Server({ port });
    }
    public bindClientConnect(server, callback: (...args: any[]) => void) {
        server.on('connection', callback);
    }
    public bindMessageHandlers(client, handlers: MessageMappingProperties[]) {
        client.on('message', (buffer) => {
            const data = JSON.parse(buffer);
            console.log(buffer)
            const { type } = data;
            console.log(type);
            const messageHandler = handlers.find((handler) => handler.message === type);
            messageHandler && messageHandler.callback(data);
        });
    }
}