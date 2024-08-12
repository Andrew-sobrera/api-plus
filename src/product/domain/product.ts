import { Brand } from "../../brand/domain/brand"
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
    category_id?: number | null | undefined
    brand_id?: number | undefined | null
}

export interface ProductResource {
    id: number | undefined
    name: string | undefined 
    price: number | undefined 
    category?: Category 
    brand?: Brand
}