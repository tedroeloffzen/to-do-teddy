import { Resolver } from '@nestjs/graphql';
import { Task } from '../../entities/task.entity';
import { TaskInput } from '../inputs/task.input';
import { TaskService } from '../../services/task.service';
import { AbstractCRUDResolver } from '../../../shared/resolver/abstract-base.resolver';

@Resolver(() => Task)
export class TaskResolver extends AbstractCRUDResolver(Task, TaskInput) {
  constructor(private readonly taskService: TaskService) {
    super();
  }

  public getService(): TaskService {
    return this.taskService;
  }
}
