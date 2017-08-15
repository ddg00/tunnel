import { Schema, Model, Document } from 'mongoose'
import { IPointer } from '../../../modules/pointer/pointer.model'
import * as TimeStamps from 'mongoose-ts'

// Interface for mongoose model
export interface IPointerModel extends IPointer, Document {}

export const PointerSchema: Schema = new Schema({
    title: { type: String, require: true },
    latitude: Number,
    longitude: Number
})

PointerSchema.plugin(TimeStamps, {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
})
