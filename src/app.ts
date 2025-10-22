import express from 'express';
import cors from 'cors';
// Mitigação rápida: proteger validator.isURL contra possíveis bypasses conhecidos
// Patch runtime — altera comportamento global do pacote `validator` com opções mais restritivas.
import * as validator from 'validator';
try {
	const originalIsURL = (validator as any).isURL;
	if (originalIsURL) {
		(validator as any).isURL = function (str: string, opts?: any) {
			const safeOpts = Object.assign({ require_protocol: true, allow_underscores: false, allow_trailing_dot: false }, opts || {});
			try {
				return originalIsURL.call(this, str, safeOpts);
			} catch (e) {
				return false;
			}
		};
	}
} catch (err) {
	// se algo falhar aqui, não quebramos o app — apenas não aplicamos o patch
	// console.warn('validator patch failed', err);
}
import authRoutes from './routes/auth.routes';
import alunoRoutes from './routes/aluno.routes';
import cursoRoutes from './routes/curso.routes';
import matriculaRoutes from './routes/matricula.routes';
import errorHandler from './middlewares/errorHandler';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));

app.use('/auth', authRoutes);
app.use('/alunos', alunoRoutes);
// Alias em português/variante para compatibilidade com requests que usem '/usuarios'
app.use('/usuarios', alunoRoutes);
app.use('/cursos', cursoRoutes);
app.use('/matriculas', matriculaRoutes);

app.use(errorHandler);

export default app;
