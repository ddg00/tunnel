import * as console from 'console';
import * as io from 'socket.io';
import { WebSocketAdapter } from '@nestjs/common';
import { MessageMappingProperties } from '@nestjs/websockets';

export class IoCostumAdapter implements WebSocketAdapter {
    private options: object ={
        pingTimeout: 35000,
        pingInterval: 25000
    }
    
    create(port: number) {
        return io(port, this.options );
    }

    createWithNamespace(port: number, namespace: string) {
        return io(port, this.options).of(namespace);
    }

    creteaWithOptions(port: number, namespace: string, options: object){
        return io(port, options).of(namespace);
    }

    bindClientConnect(server: any, callback: (...args: any[]) => void) {
        server.on('connection', callback);
    }
    
    bindClientDisconnect(client: any, callback: (...args: any[]) => void) {
        client.on('disconnect', callback);
    }

    bindMessageHandlers(client: any, handlers: MessageMappingProperties[]) {
        handlers.forEach((handler) => {
            const { message, callback } = handler;
            client.on(message, callback);
        });
    }

    bindMiddleware(server, middleware: (socket, next) => void) {
        server.use(middleware);
    }
}