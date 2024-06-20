import { DataSource } from "typeorm";
import { ProductRepository } from "../../domain/product-repository";
import { ProductEntity } from "./entity/product.entity";
import { Product } from "../../domain/product";

export class TypeOrmProductRepository implements ProductRepository {
    constructor(protected ds: DataSource){}

    async getAll(): Promise<Product[]> {
        const products = await this.ds.getRepository(ProductEntity).find()
        return products
    }
}