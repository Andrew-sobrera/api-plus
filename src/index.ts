import 'reflect-metadata'
import express, { Request, Response, NextFunction } from 'express';
import { catalogRoutes } from './routes/catalogRoutes';
import { BootstrapInit } from './common/bootstrap/bootstrap-init';
import { productBootstrap } from './product/infra/bootstrap/product-bootstrap';

const bootstraps = async () => {
    await BootstrapInit.init([productBootstrap])
}

const app = express();
const router = express.Router()
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(async (ctx: Request, response: Response, next: NextFunction) => {
    await bootstraps()
    return next()
})

router.use(catalogRoutes)
app.use(router)


app.listen(3000, () => {
  console.log(`Servidor rodando em http://localhost:3000`);
});
