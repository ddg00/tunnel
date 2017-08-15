import { Module } from '@nestjs/common';
import { TunnelGateway } from './tunnel/tunnel.gateway';
import { PointerModule } from './pointer/pointer.modul';
import { db } from '../Repositories/app.db' 
import * as Mongoose from 'mongoose'

@Module({
    modules: [ PointerModule ],
    components : [ db, TunnelGateway ]
})
export class ApplicationModule {}