import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayInit, OnGatewayConnection } from '@nestjs/websockets';

@WebSocketGateway({
    port: 4000, namespace: 'tunnel'
})
export class TunnelGateway {
    @WebSocketServer() 
    private server: object;

    public afterInit(server) {
        console.log("gateway init ====")
    }
    //public handleConnection(client) {}

    @SubscribeMessage('newLocation')
    public onNewLocation(sender, data) {
        console.log('data')
        console.log('============================')
        console.log(data)
    }
}
