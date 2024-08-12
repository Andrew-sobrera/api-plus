import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Brand } from '../../../domain/brand';
import { ProductEntity } from '../../../../product/infra/typeorm/entity/product.entity';

@Entity('brands')
export class BrandEntity extends BaseEntity implements Brand {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @OneToMany(() => ProductEntity, product => product.brand)
    products!: ProductEntity[];
}
