import { Bootstrap } from "../../../common/bootstrap/bootstrap";
import { TypeOrmHelper } from "../../../common/db/typeorm/typeorm-helper";
import { container } from 'tsyringe'
import { USER_SERVICE, UserService } from "../../domain/user-service";
import { USER_REPOSITORY } from "../../domain/user-repository";
import { TypeOrmUserRepository } from "../typeorm/typeorm-user-repository";

export class userBootstrap implements Bootstrap {
    async init(): Promise<void> {
        const ds = await TypeOrmHelper.createDataSource()
        container.register(USER_SERVICE, UserService)
        container.register(USER_REPOSITORY, {
            useValue: new TypeOrmUserRepository(ds)
        })
    }
}