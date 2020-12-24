import { Args, Int, Mutation, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Task } from '../../entities/task.entity';
import { TaskInput } from '../inputs/task.input';
import { TaskService } from '../../services/task.service';
import { AbstractCRUDResolver } from '../../../shared/resolver/abstract-base.resolver';
import { Label } from '../../entities/label.entity';

@Resolver(() => Task)
export class TaskResolver extends AbstractCRUDResolver(Task, TaskInput) {
  constructor(private readonly taskService: TaskService) {
    super();
  }

  public getService(): TaskService {
    return this.taskService;
  }

  @ResolveField('labels', returns => [Label], { nullable: 'items' })
  public getLabels(@Parent() task: Task): Promise<Label[]> {
    if (task.labels) {
      return Promise.resolve(task.labels);
    } else {
      return this.taskService.getLabelsByTask(task.id);
    }
  }

  @Mutation(returns => Task, { nullable: false })
  addLabelToTask(@Args({ type: () => Int, name: 'taskId'}) taskId: number,
                 @Args({ type: () => Int, name: 'labelId'}) labelId: number): Promise<Task> {
    return this.taskService.addLabelToTask(taskId, labelId);
  }

  @Mutation(returns => Task, { nullable: false })
  removeLabelFromTask(@Args({ type: () => Int, name: 'taskId'}) taskId: number,
                 @Args({ type: () => Int, name: 'labelId'}) labelId: number): Promise<Task> {
    return this.taskService.removeLabelFromTask(taskId, labelId);
  }

  @Mutation(returns => Task, { nullable: false })
  moveTaskToProject(@Args({ type: () => Int, name: 'taskId' }) taskId: number,
                    @Args({ type: () => Int, name: 'projectId', nullable: true }) projectId?: number): Promise<Task> {
    return this.task.moveTaskToProject(taskId, projectId)
  }
}
