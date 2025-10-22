import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Aluno } from './Aluno';
import { Matricula } from './Matricula';

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

  @OneToMany(() => Matricula, (matricula) => matricula.curso)
  matriculas!: Matricula[];

  // helper to keep compatibility with previous API which returned alunos
  alunos?: Aluno[];
}
