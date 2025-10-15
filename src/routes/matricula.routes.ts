import { Router } from 'express';
import * as MatriculaController from '../controllers/matricula.controller';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.post('/', authMiddleware, MatriculaController.matricular);
router.delete('/:id', authMiddleware, MatriculaController.cancelarMatricula);

export default router;
