import { AppDataSource } from '../../ormconfig';
import { Aluno } from '../entities/Aluno';

const repo = () => AppDataSource.getRepository(Aluno);

export const listar = async () => repo().find({ relations: ['cursos'] });
export const buscar = async (id: number) => repo().findOne({ where: { id }, relations: ['cursos'] });

export const criar = async (data: Partial<Aluno>) => {
  const existing = await repo().findOne({ where: { email: (data.email || '') } });
  if (existing) throw { status: 409, message: 'Email já cadastrado' };
  const aluno = repo().create(data as Aluno);
  return repo().save(aluno);
};

export const atualizar = async (id: number, data: Partial<Aluno>) => {
  const aluno = await repo().findOneBy({ id });
  if (!aluno) return null; 
  repo().merge(aluno, data);
  return repo().save(aluno);
};

export const remover = async (id: number) => {
  const aluno = await repo().findOneBy({ id });
  if (!aluno) return false; 
  await repo().remove(aluno);
  return true;
};