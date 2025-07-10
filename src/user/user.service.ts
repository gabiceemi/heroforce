import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
    ) { }

    async create(userData: CreateUserDto): Promise<User> {
        if (!userData.password) {
            throw new Error('Password is required');
        }
        const hashed = await bcrypt.hash(userData.password, 10);
        const user = this.userRepo.create({ ...userData, password: hashed });
        return this.userRepo.save(user);
    }

    findAll() {
        return this.userRepo.find({ relations: ['projects'] });
    }

    findOneByEmail(email: string) {
        return this.userRepo.findOne({ where: { email } });
    }
}
