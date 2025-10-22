import { AppDataSource } from '../../ormconfig';
import { Curso } from '../entities/Curso';

const repo = () => AppDataSource.getRepository(Curso);

export const listar = async (titulo?: string) => {
  const where = titulo ? { where: { titulo } } : {};
  const cursos = await repo().find({ ...(where as any), relations: ['matriculas', 'matriculas.aluno'] });
  return cursos.map((c: any) => ({ ...c, alunos: (c.matriculas || []).map((m: any) => m.aluno) }));
};

export const buscar = async (id: number) => {
  const c = await repo().findOne({ where: { id }, relations: ['matriculas', 'matriculas.aluno'] });
  if (!c) return null;
  return { ...c, alunos: (c.matriculas || []).map((m: any) => m.aluno) } as any;
};
export const criar = async (data: Partial<Curso>) => {
  const curso = repo().create(data as Curso);
  return repo().save(curso);
};
export const atualizar = async (id: number, data: Partial<Curso>) => {
  const curso = await repo().findOneBy({ id });
  if (!curso) throw { status: 404, message: 'Curso não encontrado' };
  repo().merge(curso, data);
  return repo().save(curso);
};
export const remover = async (id: number) => {
  const curso = await repo().findOneBy({ id });
  if (!curso) throw { status: 404, message: 'Curso não encontrado' };
  await repo().remove(curso);
};
