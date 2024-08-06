import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    JoinColumn
} from 'typeorm';
import { Product } from '../../../domain/product';
import { CategoryEntity } from '../../../../category/infra/typeorm/entity/category.entity';

@Entity('products')
export class ProductEntity extends BaseEntity implements Product {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    price!: number;

    @Column()
    category_id!: number;

    @Column()
    brand!: string;

    @ManyToOne(() => CategoryEntity, category => category.products)
    @JoinColumn({ name: 'category_id' })  // Especifica a coluna de chave estrangeira
    category!: CategoryEntity;
}