import express from 'express';
import { Auth } from './src/auth/domain/auth';

declare global {
  namespace Express {
    interface Request {
      auth?: Auth | null;
    }
  }
}
