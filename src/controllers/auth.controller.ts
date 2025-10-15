import { Request, Response, NextFunction } from 'express';
import * as AuthService from '../services/auth.service';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { nome, email, senha } = req.body;
    if (!nome || !email || !senha) return res.status(400).json({ error: 'nome, email e senha são obrigatórios' });
    const aluno = await AuthService.register(nome, email, senha);
    return res.status(201).json(aluno);
  } catch (err) {
    next(err);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, senha } = req.body;
    if (!email || !senha) return res.status(400).json({ error: 'email e senha são obrigatórios' });
    const token = await AuthService.login(email, senha);
    return res.json(token);
  } catch (err) {
    next(err);
  }
};
