import request from 'supertest';
import app from '../app';
import { AppDataSource } from '../../ormconfig';

let token: string;

beforeAll(async () => {
  if (!AppDataSource.isInitialized) await AppDataSource.initialize();
  const email = `c${Date.now()}@mail.com`;
  await request(app).post('/auth/register').send({ nome: 'C', email, senha: '123456' });
  const res = await request(app).post('/auth/login').send({ email, senha: '123456' });
  token = res.body.token;
});

afterAll(async () => {
  await AppDataSource.destroy();
});

describe('Cursos', () => {
  it('cria curso (201)', async () => {
    const res = await request(app).post('/cursos').set('Authorization', `Bearer ${token}`).send({ titulo: 'Node' });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
  });
});
