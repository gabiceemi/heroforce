import { IsEnum, IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({ example: 'Projeto Alpha', description: 'Nome do projeto' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Projeto de automação de tarefas', description: 'Descrição do projeto' })
  @IsString()
  description: string;

  @ApiProperty({
    example: 'pendente',
    description: 'Status do projeto',
    enum: ['pendente', 'em andamento', 'concluido'],
  })
  @IsEnum(['pendente', 'em andamento', 'concluido'])
  status: 'pendente' | 'em andamento' | 'concluido';

  @ApiProperty({
    example: {
      agilidade: 3,
      encantamento: 4,
      eficiencia: 5,
      excelencia: 2,
      transparencia: 3,
      ambicao: 4,
    },
    description: 'Metas avaliadas do projeto',
    type: Object,
  })
  @IsObject()
  goals: {
    agilidade: number;
    encantamento: number;
    eficiencia: number;
    excelencia: number;
    transparencia: number;
    ambicao: number;
  };

  @ApiProperty({ example: 1, description: 'ID do usuário responsável pelo projeto' })
  @IsNumber()
  responsibleId: number;
}
