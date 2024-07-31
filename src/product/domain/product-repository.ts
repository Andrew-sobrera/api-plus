import { ID } from "../../common/product/types"
import { Product, ProductCreate } from "./product"

export const PRODUCT_REPOSITORY = 'ProductRepository'

export interface ProductRepository {
    getAll(): Promise<Product[]>

    getOne(id: number): Promise<Product | null>

    create(product: ProductCreate): Promise<ProductCreate>

    update(product: ProductCreate, id: ID): Promise<Product>

    destroy(id: ID): Promise<void>
}
