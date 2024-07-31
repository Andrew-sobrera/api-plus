import { container, inject, injectable } from "tsyringe";
import { CATEGORY_REPOSITORY, CategoryRepository } from "./category-repository";
import { Category, CategoryCreate } from "./category";
import { ID } from "../../common/product/types";

export const CATEGORY_SERVICE = 'CategoryService'

@injectable()
export class CategoryService {
    constructor(
        @inject(CATEGORY_REPOSITORY)
        private readonly categoryRepository: CategoryRepository
    ){}

    static getInstance(): CategoryService {
        return container.resolve(CATEGORY_SERVICE)
    }

    async getAll(): Promise<Category[]>{
        const categories = await this.categoryRepository.getAll()
        return categories
    }

    async getOne(id: ID): Promise<Category | null>{
        const category = await this.categoryRepository.getOne(id)
        return category
    }

    async update(category: CategoryCreate, id: ID){
        const categoryUpdate = await this.categoryRepository.update(category, id)
        return categoryUpdate
    }

    async create(category: CategoryCreate){
        const categoryCreate = await this.categoryRepository.create(category)
        return categoryCreate
    }
}