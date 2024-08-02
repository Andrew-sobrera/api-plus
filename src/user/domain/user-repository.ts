import { UserCreate } from "./user"

export const USER_REPOSITORY = 'UserRepository'

export interface UserRepository {
    create(user: UserCreate): Promise<UserCreate>
}
