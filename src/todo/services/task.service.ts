import { Injectable } from '@nestjs/common';
import { getRepository, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../entities/task.entity';
import { TaskInput } from '../graphql/inputs/task.input';
import { Project } from '../entities/project.entity';
import { AbstractCRUDService } from '../../shared/service/abstract-base.service';
import { Label } from '../entities/label.entity';

@Injectable()
export class TaskService extends AbstractCRUDService<Task, TaskInput> {
  constructor(@InjectRepository(Task) private readonly taskRepository: Repository<Task>,
              @InjectRepository(Label) private readonly labelRepository: Repository<Label>) {
    super();
  }

  public getRepository(): Repository<Task> {
    return this.taskRepository;
  }

  public getLabelsByTask(taskId: number): Promise<Label[]> {
    return this.labelRepository
      .createQueryBuilder('label')
      .innerJoin('label.tasks', 'task')
      .where('task.id = :taskId', { taskId })
      .getMany();
  }

  public async addLabelToTask(taskId: number, labelId: number): Promise<Task> {
    const task = await this.findById(taskId, { relations: ['labels'] });
    const label = await getRepository(Label).findOneOrFail(labelId);

    if (task && label) {
      task.labels.push(label);
    }
    return this.taskRepository.save(task);
  }

  public async removeLabelFromTask(taskId: number, labelId: number): Promise<Task> {
    const task = await this.findById(taskId, { relations: ['labels'] });
    task.labels = task.labels.filter(label => label.id !== labelId);
    return this.taskRepository.save(task);
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
