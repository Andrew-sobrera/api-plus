import { ID } from "../../common/product/types"
import { Product, ProductCreate, ProductResource } from "./product"

export const PRODUCT_REPOSITORY = 'ProductRepository'

export interface ProductRepository {
    getAll(): Promise<Product[]>

    getOne(id: number): Promise<Product | null>

    create(product: ProductCreate): Promise<ProductResource>

    update(product: ProductCreate, id: ID): Promise<ProductResource | null>

    destroy(id: ID): Promise<void>
}
