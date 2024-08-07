import { DataSource } from "typeorm";
import { ProductRepository } from "../../domain/product-repository";
import { ProductEntity } from "./entity/product.entity";
import { Product, ProductCreate, ProductResource } from "../../domain/product";
import { CategoryEntity } from "../../../category/infra/typeorm/entity/category.entity";
import { Category } from "../../../category/domain/category";

export class TypeOrmProductRepository implements ProductRepository {
    constructor(protected ds: DataSource){}
    
    async getOne(id: number): Promise<ProductResource | null> {
        const productRepository = await this.ds.getRepository(ProductEntity);
        
        const product = await productRepository.createQueryBuilder('product')
            .leftJoinAndSelect('product.category', 'category')
            .select([
                'product.id',
                'product.name',
                'product.price',
                'product.brand',
                'category.id',
                'category.name'
            ])
            .where('product.id = :id', {id:id})
            .getOne();
        
        return product;
    }

    async getAll(): Promise<Product[]> {
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
        const newProduct = await this.getOne(productCreate.id)
        return { 
            id: newProduct?.id, 
            name: newProduct?.name,
            price: newProduct?.price,
            brand: newProduct?.brand,
            category: newProduct?.category
         }
    }

    async update(productData: Product, id: number): Promise<ProductResource | null> {
        const productRepository = this.ds.getRepository(ProductEntity);

        let product = await this.getOne(id)

        if (!product) {
            throw new Error(`Product with id ${id} not found`);
        }
        
        await productRepository.createQueryBuilder('product')
            .update()
            .set({name: productData.name, price: productData.price, brand: productData.brand, category_id: productData.category_id })
            .where('products.id = :id', { id : id })
            .execute()

        product = await this.getOne(id)
        return product;
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