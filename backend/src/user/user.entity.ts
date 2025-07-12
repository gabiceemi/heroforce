import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Project } from 'src/project/project.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
e
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  character: string;

  @OneToMany(() => Project, (project) => project.responsible)
  projects: Project[];
}
