import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import { BootstrapInit } from './common/bootstrap/bootstrap-init';
import { productBootstrap } from './product/infra/bootstrap/product-bootstrap';
import { product } from './product/infra/http/express/product.route';
import { categoryBootstrap } from './category/infra/bootstrap/category-bootstrap';
import { category } from './category/infra/http/express/category-route';
import { userBootstrap } from './user/infra/bootstrap/user-bootstrap';
import { user } from './user/infra/http/express/user.route';
import { authMiddleware } from './common/http/express/auth-middleware'
import { authBootstrap } from './auth/infra/bootstrap/auth-bootstrap';


export async function main() {
  await BootstrapInit.init([productBootstrap, categoryBootstrap, userBootstrap, authBootstrap]);

  const app = express();
  const router = express.Router();
  
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
  app.use(authMiddleware);
  
  router.use(product, category, user);
  app.use(router);

  app.listen(3000, () => {
    console.log(`Servidor rodando em http://localhost:3000`);
  });
}

main();
