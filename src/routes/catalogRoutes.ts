import { Request, Response, Router } from 'express'
import { ProductService } from '../product/domain/product-service'


export const catalogRoutes = Router()

catalogRoutes.get('/products', async (req: Request, res: Response) => {
   try {
    const products = await ProductService.getInstance().getAll()
    res.json(products).status(200)
   } catch (error) {
    console.log(error)
   }
})
