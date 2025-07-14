import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { User } from '../user/user.entity';
import { UpdateProjectDto } from './dto/update-project.dto';

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
        return this.projectRepository.find({
            relations: ['responsible'],
            order: { updatedAt: 'DESC' },
        });
    }

    async update(id: number, data: UpdateProjectDto): Promise<Project> {
        const project = await this.projectRepository.findOne({
            where: { id },
            relations: ['responsible'],
        });

        if (!project) {
            throw new Error(`Projeto com id ${id} não encontrado.`);
        }

        if (data.responsibleId && data.responsibleId !== project.responsible.id) {
            const newResponsible = await this.userRepository.findOneBy({ id: data.responsibleId });

            if (!newResponsible) {
                throw new Error(`Usuário com id ${data.responsibleId} não encontrado.`);
            }

            project.responsible = newResponsible;
        }

        Object.assign(project, {
            name: data.name ?? project.name,
            description: data.description ?? project.description,
            status: data.status ?? project.status,
            goals: data.goals ?? project.goals,
        });

        return this.projectRepository.save(project);
    }
}
