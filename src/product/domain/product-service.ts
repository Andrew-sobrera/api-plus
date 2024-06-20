import { container, inject, injectable } from 'tsyringe'
import { PRODUCT_REPOSITORY, ProductRepository } from './product-repository'
import { Product } from './product'

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
}