import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './project.entity';
import { UpdateProjectDto } from './dto/update-project.dto';

@ApiTags('projects')
@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) { }

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

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza um projeto existente' })
  @ApiResponse({ status: 200, description: 'Projeto atualizado com sucesso', type: Project })
  @ApiResponse({ status: 404, description: 'Projeto não encontrado' })
  update(
    @Param('id') id: number,
    @Body() body: UpdateProjectDto,
  ): Promise<Project> {
    return this.projectService.update(id, body);
  }
}
