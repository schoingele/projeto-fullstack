import 'reflect-metadata';
import dotenv from 'dotenv';
import { AppDataSource } from '../../ormconfig';
import { Aluno } from '../entities/Aluno';
import { Curso } from '../entities/Curso';
import { Matricula } from '../entities/Matricula';
import bcrypt from 'bcrypt';

dotenv.config();

async function run() {
  await AppDataSource.initialize();
  console.log('Data source initialized for seeding');

  const alunoRepo = AppDataSource.getRepository(Aluno);
  const cursoRepo = AppDataSource.getRepository(Curso);
  const matriculaRepo = AppDataSource.getRepository(Matricula);

  // clear (careful: in production don't do this)
  await matriculaRepo.delete({});
  await alunoRepo.delete({});
  await cursoRepo.delete({});

  const senha = await bcrypt.hash('123456', 10);

  const alunos = [
    alunoRepo.create({ nome: 'Rodrigo', email: 'rodrigo@mail.com', senha }),
    alunoRepo.create({ nome: 'Maria', email: 'maria@mail.com', senha }),
  ];
  await alunoRepo.save(alunos);

  const cursos = [
    cursoRepo.create({ titulo: 'Node.js Básico', descricao: 'Introdução ao Node.js', duracao_horas: 20 }),
    cursoRepo.create({ titulo: 'TypeScript Essencial', descricao: 'Aprenda TypeScript', duracao_horas: 15 }),
  ];
  await cursoRepo.save(cursos);

  const m1 = matriculaRepo.create({ aluno: alunos[0], curso: cursos[0] } as any);
  const m2 = matriculaRepo.create({ aluno: alunos[1], curso: cursos[1] } as any);
  await matriculaRepo.save([m1, m2]);

  console.log('Seed completed');
  await AppDataSource.destroy();
}

run().catch(err => {
  console.error('Seed error', err);
  process.exit(1);
});
