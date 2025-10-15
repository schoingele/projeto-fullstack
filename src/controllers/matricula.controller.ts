import { Request, Response, NextFunction } from 'express';
import * as MatriculaService from '../services/matricula.service';

export const matricular = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { alunoId, cursoId } = req.body;
    if (!alunoId || !cursoId) return res.status(400).json({ error: 'alunoId e cursoId são obrigatórios' });
    const m = await MatriculaService.matricular(Number(alunoId), Number(cursoId));
    return res.status(201).json(m);
  } catch (err) {
    next(err);
  }
};

export const cancelarMatricula = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    await MatriculaService.cancelar(id);
    return res.status(204).send();
  } catch (err) {
    next(err);
  }
};
