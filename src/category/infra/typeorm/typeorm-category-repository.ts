import { DataSource } from "typeorm";
import { CategoryRepository } from "../../domain/category-repository";
import { CategoryEntity } from "./entity/category.entity";
import { Category, CategoryCreate } from "../../domain/category";
import { ID } from "../../../common/product/types";

export class TypeOrmCategoryRepository implements CategoryRepository {
    constructor(protected ds: DataSource){}
    
    async getAll(): Promise<Category[]> {
        const categories = await this.ds.getRepository(CategoryEntity).find()
        return categories
    }
    async getOne(id: number): Promise<Category | null> {
        const category = await this.ds.getRepository(CategoryEntity).findOne({
            where: {
                id: id
            }
        })
        return category
    }
    async create(category: CategoryCreate): Promise<Category> {
        const categoryRepository = this.ds.getRepository(CategoryEntity)
        const categoryCreate = categoryRepository.create(category) 
        await categoryRepository.save(categoryCreate)
        
        return {
            id: categoryCreate.id,
            name: categoryCreate.name,
        }
    }
    async update(categoryData: CategoryCreate, id: number): Promise<Category> {
        const categoryRepository = this.ds.getRepository(CategoryEntity);
    
        const category = await categoryRepository.findOneBy({ id });

        if (!category) {
            throw new Error(`Product with id ${id} not found`);
        }

        const updateCategory = { ...category, ...categoryData };

        await categoryRepository.save(updateCategory);

        return updateCategory;
    }
    
}