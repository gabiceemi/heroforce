import { Module } from '@nestjs/common';
import { Project } from './project.entity';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, User])],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
