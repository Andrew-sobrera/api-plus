export interface UserCreate {
    id: number | undefined
    first_name: string | undefined 
    last_name: string | undefined 
    token: string | undefined 
    shop_id: number | undefined 
}

export interface User extends UserCreate{} 