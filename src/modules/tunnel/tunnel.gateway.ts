import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayInit, OnGatewayConnection } from '@nestjs/websockets';

@WebSocketGateway({
    port: 4000, namespace: 'tunnel'
})
export class TunnelGateway {
    @WebSocketServer()
    private Server: any

    private locations: any[] = [];

    private updateLocation(data: any){
        var location: object = data.location
        if('latitude' in location){
            const i = this.locations.findIndex(x => x.title === data.location.title)
            if (i >= 0) this.locations.splice(i, 1);
            this.locations.push(data.location)
        }
    }

    public afterInit(server) {
        //console.log("gateway init ==== \n", server)
    }

    public handleConnection(client) {   
        //console.log("gateway connection ==== \n", client)
    }

    @SubscribeMessage('newLocation')
    public onNewLocation(sender, data) {
        this.updateLocation(data)
        console.log('data')
        console.log('============================')
        console.log(this.locations)
        this.Server.emit('newLocation', this.locations)
        // sender.emit('newLocation', this.locations)
        // console.log("============================================== \n",
        //     sender)
    }
}
