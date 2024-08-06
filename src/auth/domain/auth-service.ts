import { container, inject, injectable } from "tsyringe";
import { AUTH_REPOSITORY, AuthRepository } from "./auth-repository";
import { Auth } from "./auth";
import { Unauthorized } from "../../common/exceptions/unauthorized";

export const AUTH_SERVICE = 'AuthService'

@injectable()
export class AuthService {
    constructor(
        @inject(AUTH_REPOSITORY)
        private readonly authRepository: AuthRepository
    ){}

    static getInstance(): AuthService {
        return container.resolve(AUTH_SERVICE)
    }

    async authenticate(token: string | null | undefined): Promise<Auth | null>{
        const auth = await this.authRepository.authenticate(token)
        if(auth?.shopId == null && auth?.token == null) throw new Unauthorized('unautorized')
        return auth
    }
}