import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateCharacterDto {
  @ApiProperty({ example: 'guerreiro', description: 'Nome do personagem escolhido pelo usuário' })
  @IsNotEmpty({ message: 'O personagem é obrigatório' })
  character: string;
}
