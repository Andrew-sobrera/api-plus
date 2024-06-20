import { Product } from "./product"

export const PRODUCT_REPOSITORY = 'ProductRepository'

export interface ProductRepository {
    getAll(): Promise<Product[]>
}