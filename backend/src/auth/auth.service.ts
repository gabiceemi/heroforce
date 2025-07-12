import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) { }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.findOneByEmail(email);
    if (!user) return null;

    const isValid = await bcrypt.compare(password, user.password);
    return isValid ? user : null;
  }

  async login(user: User) {
    const payload = { sub: user.id };
    const token = this.jwtService.sign(payload);

    const { password, ...result } = user;
    return {
      user: result,
      token,
    };
  }

  async register(createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    return this.login(user);
  }

  async getMe(userId: number) {
    const user = await this.userService.findOneById(userId);

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const { password, ...rest } = user;
    return rest;
  }
}
