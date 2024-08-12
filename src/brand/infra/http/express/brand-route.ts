import { Request, Response, Router} from 'express'
import { BrandService } from '../../../domain/brand-service'
export const brand = Router()

brand.get('/brands', async (req: Request, res: Response) => {
    try {
     const brands = await BrandService.getInstance().getAll()
     res.json(brands).status(200)
    } catch (error) {
     console.log(error)
    }
 })

 brand.get('/brands/:id', async (req: Request, res: Response) => {
    try {
     const brands = await BrandService.getInstance().getOne(Number(req.params.id))
     res.json(brands).status(200)
    } catch (error) {
     console.log(error)
    }
 })

 brand.post('/brands', async (req: Request, res: Response) => {
    try {
     const brands = await BrandService.getInstance().create(req.body)
     res.json(brands).status(200)
    } catch (error) {
     console.log(error)
    }
 })

 brand.put('/brands/:id', async (req: Request, res: Response) => {
    try {
     const brands = await BrandService.getInstance().update(req.body, Number(req.params.id))
     res.json(brands).status(200)
    } catch (error) {
     console.log(error)
    }
 })