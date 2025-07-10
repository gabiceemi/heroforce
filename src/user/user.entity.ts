import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Project } from 'src/project/project.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  character: string;

  @OneToMany(() => Project, (project) => project.responsible)
  projects: Project[];
}
