import { Bootstrap } from "../../../common/bootstrap/bootstrap";
import { TypeOrmHelper } from "../../../common/db/typeorm/typeorm-helper";
import { container } from 'tsyringe'
import { BRAND_SERVICE, BrandService } from "../../domain/brand-service";
import { BRAND_REPOSITORY } from "../../domain/brand-repository";
import { TypeOrmBrandRepository } from "../typeorm/typeorm-brand-repository";

export class brandBootstrap implements Bootstrap {
    async init(): Promise<void> {
        const ds = await TypeOrmHelper.createDataSource()
        container.register(BRAND_SERVICE, BrandService)
        container.register(BRAND_REPOSITORY, {
            useValue: new TypeOrmBrandRepository(ds)
        })
    }
}