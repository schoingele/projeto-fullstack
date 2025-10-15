import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { Curso } from './Curso';

@Entity({ name: 'aluno' })
export class Aluno {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 120 })
  nome!: string;

  @Column({ length: 150, unique: true })
  email!: string;

  @Column({ length: 150 })
  senha!: string;

  @Column({ length: 30, nullable: true })
  telefone?: string;

  @Column({ type: 'date', nullable: true })
  data_nascimento?: string;

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm!: Date;

  @ManyToMany(() => Curso, (curso) => curso.alunos)
  @JoinTable({ name: 'matricula' })
  cursos!: Curso[];
}
