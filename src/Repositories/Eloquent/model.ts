import { Model } from 'mongoose'
import { IPointerModel } from './pointer/pointer.schema'

export interface IModel {
    pointer: Model<IPointerModel>,
}