import { IPointerModel } from '../../Repositories/Eloquent/pointer/pointer.schema';
import { Component, Module } from '@nestjs/common'
import { HttpException } from '@nestjs/core'
import { PointerRepository } from '../../Repositories/Eloquent/pointer/pointer.repository'
import { IPointer } from './pointer.model'

@Component()
export class PointerService {

    getAll(){
        let p = new Promise((resolve, reject) => {
            let repo = new PointerRepository()

            repo.retrieve((err, res) => {
                if (err){
                    reject(err)
                }else{
                    resolve(res)
                }
            })
        })

        return p
    }

    findPointerByTitle(title: string){
        let p = new Promise((resolve: any | null, reject) => {
            let repo = new PointerRepository()

            repo.find({ title })
                .sort({ createdAt: -1 })
                .limit(1)
                .exec((err, res) => {
                if (err) {
                    reject(err);
                }else {
                    if (res.length) {
                        resolve(res[0]);
                    }
                    else {
                        resolve(null);
                    }
                }
            })
        })
        return p
    }

    createPointer(val: IPointer){
        let p = new Promise((resolve, reject) => {
            let repo = new PointerRepository()

            let pointer = <IPointerModel>{
                title: val.title,
                latitude: val.latitude,
                longitude: val.longitude
            }

            repo.create(pointer, (err, res) => {
                if (err) {
                    reject(err);
                }else {
                    resolve(res);
                }
            }) 
        })

        return p
    }

    updatePointer(val: IPointer){
        let p = new Promise((resolve, reject) => {
            let repo = new PointerRepository()

            let pointer = <IPointerModel>{
                title: val.title,
                latitude: val.latitude,
                longitude: val.longitude
            }

            repo.update({title: val.title}, pointer, (err, res) => {
                if (err) {
                    reject(err);
                }else {
                    resolve(res);
                }
            }) 
        })

        return p
    }
}