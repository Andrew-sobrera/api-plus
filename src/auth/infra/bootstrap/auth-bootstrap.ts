import { Bootstrap } from "../../../common/bootstrap/bootstrap";
import { TypeOrmHelper } from "../../../common/db/typeorm/typeorm-helper";
import { container } from 'tsyringe'
import { AUTH_SERVICE, AuthService } from "../../domain/auth-service";
import { AUTH_REPOSITORY } from "../../domain/auth-repository";
import { TypeOrmAuthRepository } from "../typeorm/typeorm-auth-repository";

export class authBootstrap implements Bootstrap {
    async init(): Promise<void> {
        const ds = await TypeOrmHelper.createDataSource()
        container.register(AUTH_SERVICE, AuthService)
        container.register(AUTH_REPOSITORY, {
            useValue: new TypeOrmAuthRepository(ds)
        })
    }
}