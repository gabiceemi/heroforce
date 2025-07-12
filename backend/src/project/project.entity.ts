import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user/user.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  description: string;

  @Column({ default: 'pendente' })
  @ApiProperty({ enum: ['pendente', 'em andamento', 'concluido'], default: 'pendente' })
  status: 'pendente' | 'em andamento' | 'concluido';

  @Column('jsonb')
  @ApiProperty({
    type: 'object',
    properties: {
      agilidade: { type: 'number' },
      encantamento: { type: 'number' },
      eficiencia: { type: 'number' },
      excelencia: { type: 'number' },
      transparencia: { type: 'number' },
      ambicao: { type: 'number' },
    },
  })
  goals: {
    agilidade: number;
    encantamento: number;
    eficiencia: number;
    excelencia: number;
    transparencia: number;
    ambicao: number;
  };

  @ManyToOne(() => User, (user) => user.projects)
  @ApiProperty({ type: () => User })
  responsible: User;
}
