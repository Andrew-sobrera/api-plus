import { Auth } from "./auth"

export const AUTH_REPOSITORY = 'AuthRepository'

export interface AuthRepository {
    authenticate(token: string | null | undefined): Promise<Auth | null>
}
