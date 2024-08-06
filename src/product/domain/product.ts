import { Category } from "../../category/domain/category"

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
    category_id?: number | null
    brand: string | undefined 
}

export interface ProductResource {
    id: number | undefined
    name: string | undefined 
    price: number | undefined 
    category?: Category 
    brand: string | undefined 
}