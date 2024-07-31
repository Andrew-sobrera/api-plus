export interface ProductCreate {
    id: number | undefined
    name: string | undefined 
    price: number | undefined 
    category: string | undefined 
    brand: string | undefined 
}

export interface Product extends ProductCreate{}