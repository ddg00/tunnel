import { Component, Module } from '@nestjs/common'
import { PointerSchema, IPointerModel } from './pointer.schema'
import { RepositoryBase } from '../../Contracts/Mongoose/repositoryBase'

@Component()
export class PointerRepository extends RepositoryBase<IPointerModel> {
  constructor() {
    super(PointerSchema);
  } 
}

Object.seal(PointerRepository);