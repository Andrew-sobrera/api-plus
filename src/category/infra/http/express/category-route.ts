import { Request, Response, Router} from 'express'
import { CategoryService } from '../../../domain/category-service'
export const category = Router()

category.get('/categories', async (req: Request, res: Response) => {
    try {
     const categories = await CategoryService.getInstance().getAll()
     res.json(categories).status(200)
    } catch (error) {
     console.log(error)
    }
 })

 category.get('/categories/:id', async (req: Request, res: Response) => {
    try {
     const categories = await CategoryService.getInstance().getOne(req.params.id)
     res.json(categories).status(200)
    } catch (error) {
     console.log(error)
    }
 })

 category.post('/categories', async (req: Request, res: Response) => {
    try {
      console.log('aqui')
     const categories = await CategoryService.getInstance().create(req.body)
     res.json(categories).status(200)
    } catch (error) {
     console.log(error)
    }
 })

 category.put('/categories/:id', async (req: Request, res: Response) => {
    try {
     const categories = await CategoryService.getInstance().update(req.body, req.params.id)
     res.json(categories).status(200)
    } catch (error) {
     console.log(error)
    }
 })