import { Request, Response, NextFunction } from 'express';
import * as CursoService from '../services/curso.service';

export const listarCursos = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { titulo } = req.query;
    const cursos = await CursoService.listar(titulo as string | undefined);
    return res.json(cursos);
  } catch (err) {
    next(err);
  }
};

export const buscarCurso = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const curso = await CursoService.buscar(id);
    if (!curso) return res.status(404).json({ error: 'Curso não encontrado' });
    return res.json(curso);
  } catch (err) {
    next(err);
  }
};

export const criarCurso = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { titulo, descricao, duracao_horas } = req.body;
    if (!titulo) return res.status(400).json({ error: 'titulo é obrigatório' });
    const curso = await CursoService.criar({ titulo, descricao, duracao_horas } as any);
    return res.status(201).json(curso);
  } catch (err) {
    next(err);
  }
};

export const atualizarCurso = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const curso = await CursoService.atualizar(id, req.body);
    return res.json(curso);
  } catch (err) {
    next(err);
  }
};

export const deletarCurso = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    await CursoService.remover(id);
    return res.status(204).send();
  } catch (err) {
    next(err);
  }
};

export const listarAlunosDoCurso = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const curso = await CursoService.buscar(id);
    if (!curso) return res.status(404).json({ error: 'Curso não encontrado' });
    return res.json(curso.alunos || []);
  } catch (err) {
    next(err);
  }
};
