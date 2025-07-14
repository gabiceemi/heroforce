import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Project } from '../project/project.entity';

@Entity()
export class User {
  @ApiProperty({ example: 1, description: 'ID único do usuário' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'João da Silva', description: 'Nome do usuário' })
  @Column()
  name: string;

  @ApiProperty({ example: 'joao@email.com', description: 'E-mail do usuário (único)' })
  @Column({ unique: true })
  email: string;

  @ApiHideProperty()
  @Column()
  password: string;

  @ApiProperty({ example: 'guerreiro', description: 'Personagem/herói escolhido', required: false })
  @Column({ nullable: true })
  character: string;

  @ApiHideProperty()
  @OneToMany(() => Project, (project) => project.responsible)
  projects: Project[];
}
