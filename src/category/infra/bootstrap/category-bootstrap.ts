import { Bootstrap } from "../../../common/bootstrap/bootstrap";
import { TypeOrmHelper } from "../../../common/db/typeorm/typeorm-helper";
import { container } from 'tsyringe'
import { CATEGORY_SERVICE, CategoryService } from "../../domain/category-service";
import { CATEGORY_REPOSITORY } from "../../domain/category-repository";
import { TypeOrmCategoryRepository } from "../typeorm/typeorm-category-repository";

export class categoryBootstrap implements Bootstrap {
    async init(): Promise<void> {
        const ds = await TypeOrmHelper.createDataSource()
        container.register(CATEGORY_SERVICE, CategoryService)
        container.register(CATEGORY_REPOSITORY, {
            useValue: new TypeOrmCategoryRepository(ds)
        })
    }
}