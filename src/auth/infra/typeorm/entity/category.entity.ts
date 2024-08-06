import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm'

import { Category } from '../../../domain/category'

@Entity('categories')
export class CategoryEntity extends BaseEntity implements Category {
    @PrimaryGeneratedColumn({})
    id!: number

    @Column()
    name!: string

}