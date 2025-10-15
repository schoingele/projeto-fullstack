import { AppDataSource } from '../../ormconfig';
import { Aluno } from '../entities/Aluno';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import jwtConfig from '../config/jwt';

const repo = () => AppDataSource.getRepository(Aluno);

export const register = async (nome: string, email: string, senha: string) => {
  const existing = await repo().findOne({ where: { email } });
  if (existing) throw { status: 409, message: 'Email já cadastrado' };
  const hash = await bcrypt.hash(senha, 10);
  const aluno = repo().create({ nome, email, senha: hash } as any);
  await repo().save(aluno);
  const { senha: _, ...rest } = aluno as any;
  return rest;
};

export const login = async (email: string, senha: string) => {
  const aluno = await repo().findOne({ where: { email } });
  if (!aluno) throw { status: 401, message: 'Credenciais inválidas' };
  const match = await bcrypt.compare(senha, aluno.senha);
  if (!match) throw { status: 401, message: 'Credenciais inválidas' };
  const token = jwt.sign({ id: aluno.id, email: aluno.email }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
  return { token };
};
