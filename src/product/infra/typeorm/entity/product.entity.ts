import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm'

import { Product } from '../../../domain/product'

@Entity('products')
export class ProductEntity extends BaseEntity implements Product {
    @PrimaryGeneratedColumn({})
    id!: number

    @Column()
    name!: string
    
    @Column()
    price!: number

    @Column()
    category_id!: number

    @Column()
    brand!: string
}