import { Injectable, NotFoundException } from '@nestjs/common';
import { getRepository, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../entities/task.entity';
import { TaskInput } from '../graphql/inputs/task.input';
import { Project } from '../entities/project.entity';
import { AbstractBaseService, AbstractCRUDService } from '../../shared/service/abstract-base.service';

@Injectable()
export class TaskService extends AbstractCRUDService<Task, TaskInput> {
  constructor(@InjectRepository(Task) private readonly taskRepository: Repository<Task>) {
    super();
  }

  public getRepository(): Repository<Task> {
    return this.taskRepository;
  }

  public async moveTaskToProject(taskId: number, projectId: number): Promise<Task> {
    const task = await this.findById(taskId);
    const project = projectId && await getRepository(Project).findOneOrFail(projectId);

    if (task && project) {
      task.project = project;

    } else if (task && !projectId) {
      task.project = null;
    }
    return this.taskRepository.save(task);
  }
}
