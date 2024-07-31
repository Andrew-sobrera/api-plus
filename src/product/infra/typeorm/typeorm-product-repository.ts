import { DataSource } from "typeorm";
import { ProductRepository } from "../../domain/product-repository";
import { ProductEntity } from "./entity/product.entity";
import { Product, ProductCreate } from "../../domain/product";
import { CategoryEntity } from "../../../category/infra/typeorm/entity/category.entity";
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

    async create(product: ProductCreate): Promise<ProductCreate> {
        const category = product.category
        let categoryEntity
        categoryEntity = await this.ds.getRepository(CategoryEntity).findOne({
            where: {
                name: product.category
            }
        });
        if(categoryEntity == null){
            const categoryRepository = this.ds.getRepository(CategoryEntity)
            const categoryCreate = categoryRepository.create({name: category}) 
            categoryEntity = await categoryRepository.save(categoryCreate)
        }

        const productRepository = this.ds.getRepository(ProductEntity)
        const productCreate = productRepository.create({name: product.name, price: product.price, category_id: categoryEntity.id, brand: product.brand}) 
        await productRepository.save(productCreate)
        return {
            id: productCreate.id,
            name: productCreate.name,
            price: productCreate.price,
            category: categoryEntity.name,
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

    async destroy(id: number): Promise<void> {
        const productRepository = this.ds.getRepository(ProductEntity);
        
        const product = await productRepository.findOneBy({ id });

        if (!product) {
            throw new Error(`Product with id ${id} not found`);
        }

        await productRepository.delete(id);
    }
}