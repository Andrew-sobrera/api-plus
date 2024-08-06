import { DataSource } from "typeorm";
import { ProductRepository } from "../../domain/product-repository";
import { ProductEntity } from "./entity/product.entity";
import { Product, ProductCreate, ProductResource } from "../../domain/product";
import { CategoryEntity } from "../../../category/infra/typeorm/entity/category.entity";
import { Category } from "../../../category/domain/category";

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

    async getAll(): Promise<Partial<Product>[]> {
        const productRepository = await this.ds.getRepository(ProductEntity);
        
        const products = await productRepository.createQueryBuilder('product')
            .leftJoinAndSelect('product.category', 'category')
            .select([
                'product.id',
                'product.name',
                'product.price',
                'product.brand',
                'category.id',
                'category.name'
            ])
            .getMany();
        
        return products;
    }

    async create(product: ProductCreate): Promise<ProductResource> {
        let category: any = 10
        let categoryEntity
        
        if(product.category != null){
            categoryEntity = await this.createOrAddCategoryProduct(product.category)
            category = categoryEntity.id
        }

        const productRepository = this.ds.getRepository(ProductEntity)
        const productCreate = productRepository.create({name: product.name, price: product.price, category_id: category, brand: product.brand}) 
        await productRepository.save(productCreate)
        return {
            id: productCreate.id,
            name: productCreate.name,
            brand: productCreate.brand,
            price: productCreate.price,
            category: categoryEntity

        }
    }

    async update(productData: ProductCreate, id: number): Promise<Product | void> {
        // const productRepository = this.ds.getRepository(ProductEntity);
    
        // const product = await productRepository.findOneBy({ id });

        // if (!product) {
        //     throw new Error(`Product with id ${id} not found`);
        // }

        // const updatedProduct = { ...product, ...productData };

        // await productRepository.save(updatedProduct);

        // return updatedProduct;
    }

    async destroy(id: number): Promise<void> {
        const productRepository = this.ds.getRepository(ProductEntity);
        
        const product = await productRepository.findOneBy({ id });

        if (!product) {
            throw new Error(`Product with id ${id} not found`);
        }

        await productRepository.delete(id);
    }

    private async createOrAddCategoryProduct(category: string): Promise<Category>{

        let categoryEntity = await this.ds.getRepository(CategoryEntity).findOne({
            where: {
                name: category
            }
        });

        if(categoryEntity == null){
            const categoryRepository = this.ds.getRepository(CategoryEntity)
            const categoryCreate = categoryRepository.create({name: category}) 
            categoryEntity = await categoryRepository.save(categoryCreate)
        }

        return categoryEntity
    }
}