import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

import { UserService } from './user.service';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';

@ApiTags('users') 
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo usuário' })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os usuários' })
  @ApiResponse({ status: 200, description: 'Lista retornada com sucesso' })
  findAll() {
    return this.userService.findAll();
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza o personagem do usuário' })
  @ApiParam({ name: 'id', description: 'ID do usuário' })
  @ApiResponse({ status: 200, description: 'Personagem atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  updateCharacter(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateCharacterDto,
  ) {
    return this.userService.updateCharacter(id, body.character);
  }
}
