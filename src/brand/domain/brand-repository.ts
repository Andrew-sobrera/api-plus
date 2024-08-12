import { ID } from "../../common/product/types"
import { Brand, BrandCreate } from "./brand"

export const BRAND_REPOSITORY = 'BrandRepository'

export interface BrandRepository {
    getAll(): Promise<Brand[]>

    getOne(id: ID): Promise<Brand | null>

    create(category: BrandCreate): Promise<Brand>

    update(category: BrandCreate, id: ID): Promise<Brand>
}
