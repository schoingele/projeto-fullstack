import request from 'supertest';
import app from '../app';
import { AppDataSource } from '../../ormconfig';

beforeAll(async () => {
  if (!AppDataSource.isInitialized) await AppDataSource.initialize();
});

afterAll(async () => {
  await AppDataSource.destroy();
});

describe('Auth', () => {
  it('register and login', async () => {
    const email = `test${Date.now()}@mail.com`;
    const register = await request(app).post('/auth/register').send({ nome: 'Teste', email, senha: '123456' });
    expect(register.status).toBe(201);

    const login = await request(app).post('/auth/login').send({ email, senha: '123456' });
    expect(login.status).toBe(200);
    expect(login.body).toHaveProperty('token');
  });
});
