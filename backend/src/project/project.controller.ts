import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './project.entity';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  create(@Body() body: CreateProjectDto): Promise<Project> {
    return this.projectService.create(body);
  }

  @Get()
  findAll(): Promise<Project[]> {
    return this.projectService.findAll();
  }
}
