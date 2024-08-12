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
import { BrandEntity } from '../../../../brand/infra/typeorm/entity/brand.entity';

@Entity('products')
export class ProductEntity extends BaseEntity implements Product {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    price!: number;

    @Column()
    category_id!: number | null;

    @Column()
    brand_id!: number | null;

    @ManyToOne(() => CategoryEntity, category => category.products)
    @JoinColumn({ name: 'category_id' })
    category!: CategoryEntity;

    @ManyToOne(() => BrandEntity, brand => brand.products)
    @JoinColumn({ name: 'brand_id' })
    brand!: BrandEntity;
}