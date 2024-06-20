import { ObjectLiteral } from 'typeorm'
import { ProductEntity } from '../../../../product/infra/typeorm/entity/product.entity'

type EntityConstructor = new () => ObjectLiteral
export const ENTITIES: EntityConstructor[] = [ProductEntity]