import { Component } from '@nestjs/common'
import { PointerSchema, IPointerModel } from './Eloquent/pointer/pointer.schema'
import { IModel } from './Eloquent/model'
import * as Mongoose from 'mongoose'

@Component()
export class db {
    private model: IModel

    constructor() {
        this.model = Object()
        
        this.config()
    }

    config(): void {
        const MONGODB_CONNECTION: string = "mongodb://localhost:27017/tunnel";

        global.Promise = require("q").Promise;
        Mongoose.Promise = global.Promise;

        //connect to mongoose
        let connection: Mongoose.Connection = Mongoose.createConnection(MONGODB_CONNECTION);

        //create models
        this.model.pointer = connection.model<IPointerModel>("User", PointerSchema);
    }
}