import { Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, Unique } from 'typeorm';
import { Aluno } from './Aluno';
import { Curso } from './Curso';

@Entity({ name: 'matricula' })
@Unique(['aluno', 'curso'])
export class Matricula {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Aluno, (aluno) => aluno.cursos, { onDelete: 'CASCADE' })
  aluno!: Aluno;

  @ManyToOne(() => Curso, (curso) => curso.alunos, { onDelete: 'CASCADE' })
  curso!: Curso;

  @CreateDateColumn({ name: 'data_matricula' })
  dataMatricula!: Date;
}
