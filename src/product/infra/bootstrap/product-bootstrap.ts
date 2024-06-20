import { Bootstrap } from "../../../common/bootstrap/bootstrap";
import { TypeOrmHelper } from "../../../common/db/typeorm/typeorm-helper";
import { container } from 'tsyringe'
import { PRODUCT_SERVICE, ProductService } from "../../domain/product-service";
import { PRODUCT_REPOSITORY } from "../../domain/product-repository";
import { TypeOrmProductRepository } from "../typeorm/typeorm-product-repository";

export class productBootstrap implements Bootstrap {
    async init(): Promise<void> {
        const ds = await TypeOrmHelper.createDataSource()
        container.register(PRODUCT_SERVICE, ProductService)
        container.register(PRODUCT_REPOSITORY, {
            useValue: new TypeOrmProductRepository(ds)
        })
    }
}