import { container, inject, injectable } from 'tsyringe'
import { PRODUCT_REPOSITORY, ProductRepository } from './product-repository'
import { Product, ProductCreate } from './product'
import { ID } from '../../common/product/types'

export const PRODUCT_SERVICE = 'ProductService'

@injectable()
export class ProductService {
    constructor(
        @inject(PRODUCT_REPOSITORY)
        private readonly productRepository: ProductRepository
    ){}

    static getInstance(): ProductService {
        return container.resolve(PRODUCT_SERVICE)
    }

    async getAll():Promise<Product[]>{
        const products = await this.productRepository.getAll()
        return products
    }

    async getOne(id: any): Promise<Product | null>{
        const product = await this.productRepository.getOne(id)
        return product
    }

    async create(product: ProductCreate): Promise<Product>{
        const productCreate = await this.productRepository.create(product)
        return productCreate
    }

    async update(product: ProductCreate, id: ID): Promise<Product>{
        const productUpdate = await this.productRepository.update(product, id)
        return productUpdate
    }

    async destroy(id: ID): Promise<void>{
        await this.productRepository.destroy(id)
        return
    }
}