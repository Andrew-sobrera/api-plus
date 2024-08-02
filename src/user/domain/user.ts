export interface UserCreate {
    id: number | undefined
    first_name: string | undefined 
    last_name: string | undefined 
    token: string | undefined 
}

export interface User extends UserCreate{} 