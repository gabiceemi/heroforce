import { IsEnum, IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;

  @IsEnum(['pendente', 'em andamento', 'concluido'])
  status: 'pendente' | 'em andamento' | 'concluido';

  @IsObject()
  goals: {
    agilidade: number;
    encantamento: number;
    eficiencia: number;
    excelencia: number;
    transparencia: number;
    ambicao: number;
  };

  @IsNumber()
  responsibleId: number;
}
