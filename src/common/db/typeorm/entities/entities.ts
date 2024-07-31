import { ObjectLiteral } from 'typeorm'
import { ProductEntity } from '../../../../product/infra/typeorm/entity/product.entity'
import { CategoryEntity } from '../../../../category/infra/typeorm/entity/category.entity'

type EntityConstructor = new () => ObjectLiteral
export const ENTITIES: EntityConstructor[] = [ProductEntity, CategoryEntity]