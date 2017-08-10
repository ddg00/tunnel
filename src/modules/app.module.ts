import { Module } from '@nestjs/common';
import { TunnelGateway } from './tunnel/tunnel.gateway';

@Module({
    components : [ TunnelGateway ]
})
export class ApplicationModule {}