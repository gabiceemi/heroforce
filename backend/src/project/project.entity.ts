import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from '../user/user.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ default: 'pendente' })
  status: 'pendente' | 'em andamento' | 'concluido';

  @Column('jsonb')
  goals: {
    agilidade: number;
    encantamento: number;
    eficiencia: number;
    excelencia: number;
    transparencia: number;
    ambicao: number;
  };

  @ManyToOne(() => User, (user) => user.projects)
  responsible: User;
}
