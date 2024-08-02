import { container, inject, injectable } from 'tsyringe'
import { USER_REPOSITORY, UserRepository } from './user-repository'
import { User, UserCreate } from './user'

export const USER_SERVICE = 'UserService'

@injectable()
export class UserService {
    constructor(
        @inject(USER_REPOSITORY)
        private readonly userRepository: UserRepository
    ){}

    static getInstance(): UserService {
        return container.resolve(USER_SERVICE)
    }

    async create(user: UserCreate): Promise<User>{
        const userCreate = await this.userRepository.create(user)
        return userCreate
    }

}