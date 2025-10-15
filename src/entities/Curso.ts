import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToMany } from 'typeorm';
import { Aluno } from './Aluno';

@Entity({ name: 'curso' })
export class Curso {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 150 })
  titulo!: string;

  @Column({ type: 'text', nullable: true })
  descricao?: string;

  @Column({ type: 'int', nullable: true })
  duracao_horas?: number;

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm!: Date;

  @ManyToMany(() => Aluno, (aluno) => aluno.cursos)
  alunos!: Aluno[];
}
