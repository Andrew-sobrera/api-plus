import { Request, Response, Router} from 'express'
import { ProductService } from '../../../domain/product-service'
export const product = Router()

product.get('/products', async (req: Request, res: Response) => {
    try {
     const products = await ProductService.getInstance().getAll()
     res.json(products).status(200)
    } catch (error) {
     console.log(error)
    }
 })

 product.get('/products/:id', async (req: Request, res: Response) => {
    try{
        const product = await ProductService.getInstance().getOne(req.params.id)
        res.json(product).status(200)
    }catch(error){
        console.log(error)
    }
 })

 product.post('/products', async (req: Request, res: Response) => {
    try{
        const productCreate = await ProductService.getInstance().create(req.body)
        res.json(productCreate)
    }catch(error){
        console.log(error)
    }
 })

 product.put('/products/:id', async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const productUpdate = await ProductService.getInstance().update(req.body, id)
        res.json().status(201)
    } catch (error) {
        console.log(error)
    }
 })

 product.delete('/products/:id', async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
         ProductService.getInstance().destroy(id)
        res.json().status(404)
    } catch (error) {
        console.log(error)
    }
 })