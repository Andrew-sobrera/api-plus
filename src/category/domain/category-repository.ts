import { ID } from "../../common/product/types"
import { Category, CategoryCreate } from "./category"

export const CATEGORY_REPOSITORY = 'CategoryRepository'

export interface CategoryRepository {
    getAll(): Promise<Category[]>

    getOne(id: ID): Promise<Category | null>

    create(category: CategoryCreate): Promise<Category>

    update(category: CategoryCreate, id: ID): Promise<Category>
}
