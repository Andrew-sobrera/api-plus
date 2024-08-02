import { DataSource } from "typeorm";
import { UserRepository } from "../../domain/user-repository";
import { UserEntity } from "./entity/user.entity";
import { User, UserCreate } from "../../domain/user";
import jwt from 'jsonwebtoken';  // Certifique-se de importar a biblioteca corretamente

export class TypeOrmUserRepository implements UserRepository {
    constructor(protected ds: DataSource) {}

    async create(user: UserCreate): Promise<UserCreate> {
        const SECRET_KEY = 'andrewsobrera';
        const token = jwt.sign({ first_name: user.first_name }, SECRET_KEY);

        const userRepository = this.ds.getRepository(UserEntity);
        const userCreate = userRepository.create({
            first_name: user.first_name,
            last_name: user.last_name,
            token: token 
        });
        await userRepository.save(userCreate);

        return {
            id: userCreate.id,
            first_name: userCreate.first_name,
            last_name: userCreate.last_name,
            token: userCreate.token
        };
    }
}