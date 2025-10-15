import { Router } from 'express';
import * as CursoController from '../controllers/curso.controller';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.get('/', authMiddleware, CursoController.listarCursos);
router.get('/:id', authMiddleware, CursoController.buscarCurso);
router.post('/', authMiddleware, CursoController.criarCurso);
router.put('/:id', authMiddleware, CursoController.atualizarCurso);
router.delete('/:id', authMiddleware, CursoController.deletarCurso);
router.get('/:id/alunos', authMiddleware, CursoController.listarAlunosDoCurso);

export default router;
