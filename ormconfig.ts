import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { Aluno } from './src/entities/Aluno';
import { Curso } from './src/entities/Curso';
import { Matricula } from './src/entities/Matricula';

dotenv.config();

const isTest = process.env.NODE_ENV === 'test';

export const AppDataSource = new DataSource(
  isTest
    ? {
        type: 'sqlite',
        database: ':memory:',
        synchronize: true,
        logging: false,
        entities: [Aluno, Curso, Matricula],
      }
    : {
        type: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT || 5432),
        username: process.env.DB_USERNAME || 'postgres',
        password: process.env.DB_PASSWORD || 'postgres',
        database: process.env.DB_DATABASE || 'backend_cursos_db',
        synchronize: true,
        logging: false,
        entities: [Aluno, Curso, Matricula],
      }
);
