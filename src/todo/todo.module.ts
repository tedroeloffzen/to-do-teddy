import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Label } from './entities/label.entity';
import { Project } from './entities/project.entity';
import { Task } from './entities/task.entity';
import { Comment } from './entities/comment.entity';
import { TaskService } from './services/task.service';
import { TaskResolver } from './graphql/resolvers/task.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, Project, Comment, Label])],
  providers: [
    TaskService,
    TaskResolver
  ]
})
export class TodoModule {}
