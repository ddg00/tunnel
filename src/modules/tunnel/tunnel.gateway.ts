import { WebSocketGateway, 
         WebSocketServer, 
         SubscribeMessage, 
         OnGatewayInit, 
         OnGatewayConnection } from '@nestjs/websockets';
import { PointerService } from '../pointer/pointer.service';

@WebSocketGateway({
    port: 4000, namespace: 'tunnel'
})
export class TunnelGateway {
    @WebSocketServer()
    private Server: any
    private pointerService: PointerService

    afterInit(server) {
        //console.log("gateway init ==== \n", server)
    }

    handleConnection(client) {   
        //console.log("gateway connection ==== \n", client)
    }

    @SubscribeMessage('newLocation')
    async onNewLocation(sender, data) {
        console.log('data recive', data)
        let pointer = await this.pointerService.findPointerByTitle(data.location.title)
        if(pointer){
            await this.pointerService.updatePointer(data.location)
        }else{
            await this.pointerService.createPointer(data.location)
        }
        console.log('data')
        console.log('============================')
        const pointers = await this.pointerService.getAll()
        console.log(pointers)
        console.log('==================================')
        this.Server.emit(pointers)
        // sender.emit('newLocation', this.locations)
        // console.log("============================================== \n",
        //     sender)
    }
}
