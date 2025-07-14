import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateProjectDto } from './create-project.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
  @ApiPropertyOptional({ example: 'Projeto Alpha v2', description: 'Novo nome do projeto' })
  name?: string;

  @ApiPropertyOptional({ example: 'Atualização do projeto de automação', description: 'Nova descrição' })
  description?: string;

  @ApiPropertyOptional({
    example: 'em andamento',
    description: 'Novo status do projeto',
    enum: ['pendente', 'em andamento', 'concluido'],
  })
  status?: 'pendente' | 'em andamento' | 'concluido';

  @ApiPropertyOptional({
    example: {
      agilidade: 4,
      encantamento: 5,
      eficiencia: 4,
      excelencia: 3,
      transparencia: 5,
      ambicao: 5,
    },
    description: 'Novas metas do projeto',
    type: Object,
  })
  goals?: {
    agilidade: number;
    encantamento: number;
    eficiencia: number;
    excelencia: number;
    transparencia: number;
    ambicao: number;
  };

  @ApiPropertyOptional({ example: 2, description: 'Novo ID do usuário responsável' })
  responsibleId?: number;
}
