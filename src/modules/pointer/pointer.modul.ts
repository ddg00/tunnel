import { Module } from '@nestjs/common';
import { PointerController } from './pointer.controller';
import { PointerService } from './pointer.service';

@Module({
    controllers: [ PointerController ],
    components: [ PointerService ]
})
export class PointerModule {}
