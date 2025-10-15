import { Request, Response, NextFunction } from 'express';
import * as AlunoService from '../services/aluno.service';

export const listarAlunos = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const alunos = await AlunoService.listar();
    return res.json(alunos);
  } catch (err) {
    next(err);
  }
};

export const buscarAluno = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const aluno = await AlunoService.buscar(id);
    if (!aluno) return res.status(404).json({ error: 'Aluno não encontrado' });
    return res.json(aluno);
  } catch (err) {
    next(err);
  }
};

export const criarAluno = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { nome, email, senha, telefone, data_nascimento } = req.body;
    if (!nome || !email || !senha) return res.status(400).json({ error: 'nome, email e senha são obrigatórios' });
    const aluno = await AlunoService.criar({ nome, email, senha, telefone, data_nascimento } as any);
    return res.status(201).json(aluno);
  } catch (err) {
    next(err);
  }
};

export const atualizarAluno = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const aluno = await AlunoService.atualizar(id, req.body);
    return res.json(aluno);
  } catch (err) {
    next(err);
  }
};

export const atualizarParcial = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const aluno = await AlunoService.atualizar(id, req.body);
    return res.json(aluno);
  } catch (err) {
    next(err);
  }
};

export const deletarAluno = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    await AlunoService.remover(id);
    return res.status(204).send();
  } catch (err) {
    next(err);
  }
};
