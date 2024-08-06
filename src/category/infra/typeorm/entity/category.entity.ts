import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from '../../../domain/category';
import { ProductEntity } from '../../../../product/infra/typeorm/entity/product.entity';

@Entity('categories')
export class CategoryEntity extends BaseEntity implements Category {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @OneToMany(() => ProductEntity, product => product.category)
    products!: ProductEntity[];
}
