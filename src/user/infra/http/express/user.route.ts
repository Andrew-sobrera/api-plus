import { Request, Response, Router} from 'express'
import { UserService } from '../../../domain/user-service'
export const user = Router()


 user.post('/users', async (req: Request, res: Response) => {
    try{
        const userCreate = await UserService.getInstance().create(req.body)
        res.json(userCreate)
    }catch(error){
        console.log(error)
    }
 })
