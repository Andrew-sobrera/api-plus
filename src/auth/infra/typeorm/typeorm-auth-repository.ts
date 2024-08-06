import { DataSource } from "typeorm";
import { AuthRepository } from "../../domain/auth-repository";
import { UserEntity } from "../../../user/infra/typeorm/entity/user.entity";
import { Auth } from "../../domain/auth";
import { error } from "console";

export class TypeOrmAuthRepository implements AuthRepository {
    constructor(protected ds: DataSource){}
    
    async authenticate(token: string): Promise<Auth | null> {
      try {
        const auth = await this.ds.getRepository(UserEntity).findOne({
            where: {
                token: token
            }
        })
        return {shopId: auth?.shop_id, token: auth?.token}
      } catch (error) {
        return null
      }
    }
    
}