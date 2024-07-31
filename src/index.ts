import 'reflect-metadata'
import express, { Request, Response, NextFunction } from 'express';
import { BootstrapInit } from './common/bootstrap/bootstrap-init';
import { productBootstrap } from './product/infra/bootstrap/product-bootstrap';
import { product } from './product/infra/http/express/product.route';
import { categoryBootstrap } from './category/infra/bootstrap/category-bootstrap';
import { category } from './category/infra/http/express/category-route';

const bootstraps = async () => {
    await BootstrapInit.init([productBootstrap, categoryBootstrap])
}

const app = express();
const router = express.Router()
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(async (ctx: Request, response: Response, next: NextFunction) => {
    await bootstraps()
    return next()
})

router.use(product, category)
app.use(router)


app.listen(3000, () => {
  console.log(`Servidor rodando em http://localhost:3000`);
});
