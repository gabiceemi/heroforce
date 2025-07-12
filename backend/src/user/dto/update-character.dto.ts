import { IsNotEmpty } from 'class-validator';

export class UpdateCharacterDto {
  @IsNotEmpty({ message: 'O personagem é obrigatório' })
  character: string;
}
