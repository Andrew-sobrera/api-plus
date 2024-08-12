import { container, inject, injectable } from "tsyringe";
import { BRAND_REPOSITORY, BrandRepository } from "./brand-repository";
import { Brand, BrandCreate } from "./brand";
import { ID } from "../../common/product/types";

export const BRAND_SERVICE = 'BrandService'

@injectable()
export class BrandService {
    constructor(
        @inject(BRAND_REPOSITORY)
        private readonly brandRepository: BrandRepository
    ){}

    static getInstance(): BrandService {
        return container.resolve(BRAND_SERVICE)
    }

    async getAll(): Promise<Brand[]>{
        const categories = await this.brandRepository.getAll()
        return categories
    }

    async getOne(id: ID): Promise<Brand | null>{
        const brand = await this.brandRepository.getOne(id)
        return brand
    }

    async update(brand: BrandCreate, id: ID){
        const brandUpdate = await this.brandRepository.update(brand, id)
        return brandUpdate
    }

    async create(brand: BrandCreate){
        const brandCreate = await this.brandRepository.create(brand)
        return brandCreate
    }
}