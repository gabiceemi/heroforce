import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { User } from '../user/user.entity';

@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(Project)
        private readonly projectRepository: Repository<Project>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async create(data: CreateProjectDto): Promise<Project> {
        const user = await this.userRepository.findOneBy({ id: data.responsibleId });

        if (!user) {
            throw new Error(`Usuário com id ${data.responsibleId} não encontrado.`);
        }

        const project = this.projectRepository.create({
            name: data.name,
            description: data.description,
            status: data.status,
            goals: data.goals,
            responsible: user,
        });

        return this.projectRepository.save(project);
    }

    async findAll(): Promise<Project[]> {
        return this.projectRepository.find({ relations: ['responsible'] });
    }
}
