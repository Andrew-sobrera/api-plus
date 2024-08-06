import { NextFunction, Request, Response } from 'express';
import { AuthService } from '../../../auth/domain/auth-service';
import { Unauthorized } from '../../exceptions/unauthorized';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    if (!token) {
      throw new Unauthorized('Token não fornecido');
    }
    const auth = await AuthService.getInstance().authenticate(token);
    if (!auth) {
      throw new Unauthorized('Autenticação falhou');
    }
    req.auth = auth;
    next();
  } catch (error) {
    if (error instanceof Unauthorized) {
      res.status(401).json({ message: 'Autenticação falhou' });
    } else {
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }
};
