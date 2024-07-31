export interface ProductCreate {
    id: number | undefined
    name: string | undefined 
    price: number | undefined 
    category: string | undefined 
    brand: string | undefined 
}

export interface Product{
    id: number | undefined
    name: string | undefined 
    price: number | undefined 
    category_id?: number | undefined 
    brand: string | undefined 
}