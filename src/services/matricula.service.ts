import { AppDataSource } from '../../ormconfig';
import { Matricula } from '../entities/Matricula';
import { Aluno } from '../entities/Aluno';
import { Curso } from '../entities/Curso';

const matriculaRepo = () => AppDataSource.getRepository(Matricula);
const alunoRepo = () => AppDataSource.getRepository(Aluno);
const cursoRepo = () => AppDataSource.getRepository(Curso);

export const matricular = async (alunoId: number, cursoId: number) => {
  const aluno = await alunoRepo().findOneBy({ id: alunoId });
  const curso = await cursoRepo().findOneBy({ id: cursoId });
  if (!aluno || !curso) throw { status: 404, message: 'Aluno ou Curso não encontrado' };
  const exists = await matriculaRepo().findOne({ where: { aluno: { id: aluno.id }, curso: { id: curso.id } }, relations: ['aluno', 'curso'] });
  if (exists) throw { status: 409, message: 'Matrícula já existe' };
  const m = matriculaRepo().create({ aluno, curso } as any);
  return matriculaRepo().save(m);
};

export const cancelar = async (id: number) => {
  const m = await matriculaRepo().findOne({ where: { id } });
  if (!m) throw { status: 404, message: 'Matrícula não encontrada' };
  await matriculaRepo().remove(m);
};
