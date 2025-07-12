import { Controller, Post, Body, Get, Patch, Param, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Patch(':id')
  updateCharacter(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateCharacterDto,
  ) {
    return this.userService.updateCharacter(id, body.character);
  }
}
