import { DataSource } from "typeorm";
import { ProductRepository } from "../../domain/product-repository";
import { ProductEntity } from "./entity/product.entity";
import { Product, ProductCreate } from "../../domain/product";
import { error } from "console";
import { ID } from "../../../common/product/types";

export class TypeOrmProductRepository implements ProductRepository {
    constructor(protected ds: DataSource){}
    
    async getOne(id: number): Promise<Product | null> {
        const product = await this.ds.getRepository(ProductEntity).findOne({
            where: {
                id:id
            }
        });
        return product
    }

    async getAll(): Promise<Product[]> {
        const products = await this.ds.getRepository(ProductEntity).find()
        return products
    }

    async create(product: ProductCreate): Promise<Product> {
        const productRepository = this.ds.getRepository(ProductEntity)
        const productCreate = productRepository.create(product) 
        await productRepository.save(productCreate)
        return {
            id: productCreate.id,
            name: productCreate.name,
            price: productCreate.price,
            category: productCreate.category,
            brand: productCreate.brand
        }
    }

    async update(productData: ProductCreate, id: number): Promise<Product> {
        const productRepository = this.ds.getRepository(ProductEntity);
    
        const product = await productRepository.findOneBy({ id });

        if (!product) {
            throw new Error(`Product with id ${id} not found`);
        }

        const updatedProduct = { ...product, ...productData };

        await productRepository.save(updatedProduct);

        return updatedProduct;
    }
}