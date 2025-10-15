import { AppDataSource } from '../../ormconfig';
import { Curso } from '../entities/Curso';

const repo = () => AppDataSource.getRepository(Curso);

export const listar = async (titulo?: string) => {
  if (titulo) return repo().find({ where: { titulo }, relations: ['alunos'] });
  return repo().find({ relations: ['alunos'] });
};
export const buscar = async (id: number) => repo().findOne({ where: { id }, relations: ['alunos'] });
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
