import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './project.entity';

@ApiTags('projects')
@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo projeto' })
  @ApiResponse({ status: 201, description: 'Projeto criado com sucesso', type: Project })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  create(@Body() body: CreateProjectDto): Promise<Project> {
    return this.projectService.create(body);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os projetos' })
  @ApiResponse({ status: 200, description: 'Lista de projetos retornada com sucesso', type: [Project] })
  findAll(): Promise<Project[]> {
    return this.projectService.findAll();
  }
}
