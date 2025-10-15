import request from 'supertest';
import app from '../app';
import { AppDataSource } from '../../ormconfig';

let token: string;

beforeAll(async () => {
  if (!AppDataSource.isInitialized) await AppDataSource.initialize();
  const email = `a${Date.now()}@mail.com`;
  await request(app).post('/auth/register').send({ nome: 'A', email, senha: '123456' });
  const res = await request(app).post('/auth/login').send({ email, senha: '123456' });
  token = res.body.token;
});

afterAll(async () => {
  await AppDataSource.destroy();
});

describe('Alunos', () => {
  it('lista alunos (401 sem token)', async () => {
    const res = await request(app).get('/alunos');
    expect(res.status).toBe(401);
  });

  it('lista alunos (200 com token)', async () => {
    const res = await request(app).get('/alunos').set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
  });
});
