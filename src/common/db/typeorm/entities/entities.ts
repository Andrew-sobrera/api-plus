import { ObjectLiteral } from 'typeorm'
import { ProductEntity } from '../../../../product/infra/typeorm/entity/product.entity'
import { CategoryEntity } from '../../../../category/infra/typeorm/entity/category.entity'
import { UserEntity } from '../../../../user/infra/typeorm/entity/user.entity'
import { BrandEntity } from '../../../../brand/infra/typeorm/entity/brand.entity'

type EntityConstructor = new () => ObjectLiteral
export const ENTITIES: EntityConstructor[] = [ProductEntity, CategoryEntity, UserEntity, BrandEntity]