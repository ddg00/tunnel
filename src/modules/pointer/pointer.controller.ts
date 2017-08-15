import { PointerService } from './pointer.service';
import { Dependencies, 
         Controller, 
         Get, 
         Post, 
         Res,
         Param, 
         Body, 
         HttpStatus } from '@nestjs/common';

@Controller('pointer')
export class PointerController {
    constructor(private pointerService: PointerService){}

    @Get()
    async getAllPointers(@Res() res) {
        const pointers = await this.pointerService.getAll()
        res.status(HttpStatus.OK).json(pointers)
    }

    @Get('/:title')
    async getPointer(@Res() res, @Param('title') title: string){
        const pointer = await this.pointerService.findPointerByTitle(title)
        res.status(HttpStatus.OK).json(pointer)
    }

}