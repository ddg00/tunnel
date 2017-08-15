import { Component } from '@nestjs/common'
import { IRead } from './read.interface'
import { IWrite } from './write.interface'
import { Document, Model, Query, Types } from 'mongoose'

@Component()
export class RepositoryBase<T extends Document> implements IRead<T>, IWrite<T> {

    private _model: Model<Document>;

    constructor(schemaModel: Model<Document>) {
        this._model = schemaModel;
    }

    create(item: T, callback: (error: any, result: T) => void) {
        this._model.create(item, callback);
    }

    retrieve(callback: (error: any, result: T) => void){
        this._model.find({}, callback);
    }

    findById(_id: string, callback: (error: any, result: T) => void){
        this._model.findById(_id, callback);
    }

    findOne(cond?: Object, callback?: (err: any, res: T) => void): Query<T> {
        return this._model.findOne(cond, callback);
    }

    find(cond?: Object, fields?: Object, options?: Object, callback?: (err: any, res: T[]) => void): Query<T[]> {
        return this._model.find(cond, options, callback);
    }

    update(_id: Types.ObjectId, item: T, callback: (error: any, result: any) => void) {
        this._model.update({ _id: _id }, item, callback);
    }
    
    delete(_id: string, callback: (error: any, result: any) => void) {
        this._model.remove({ _id: this.toObjectId(_id) }, (err) => callback(err, null));
    }
    private toObjectId(_id: string): Types.ObjectId {
        return Types.ObjectId.createFromHexString(_id);
    }
}