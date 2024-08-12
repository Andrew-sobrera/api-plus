import { DataSource } from "typeorm";
import { BrandRepository } from "../../domain/brand-repository";
import { BrandEntity } from "./entity/brand.entity";
import { Brand, BrandCreate } from "../../domain/brand";
import { ID } from "../../../common/product/types";

export class TypeOrmBrandRepository implements BrandRepository {
    constructor(protected ds: DataSource){}
    
    async getAll(): Promise<Brand[]> {
        const Brands = await this.ds.getRepository(BrandEntity).find()
        return Brands
    }
    async getOne(id: number): Promise<Brand | null> {
        const brand = await this.ds.getRepository(BrandEntity).findOne({
            where: {
                id: id
            }
        })
        return brand
    }
    async create(brand: BrandCreate): Promise<Brand> {
        const brandRepository = this.ds.getRepository(BrandEntity)
        const brandCreate = brandRepository.create(brand) 
        await brandRepository.save(brandCreate)
        
        return {
            id: brandCreate.id,
            name: brandCreate.name,
        }
    }
    async update(brandData: BrandCreate, id: number): Promise<Brand> {
        const brandRepository = this.ds.getRepository(BrandEntity);
    
        const brand = await brandRepository.findOneBy({ id });

        if (!brand) {
            throw new Error(`Product with id ${id} not found`);
        }

        const updateBrand = { ...brand, ...brandData };

        await brandRepository.save(updateBrand);

        return updateBrand;
    }
    
}