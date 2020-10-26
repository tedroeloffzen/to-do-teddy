import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Task } from './task.entity';
import { BaseEntity } from '../../common/base.entity';

@Entity()
@Index('idx_comment_task', ['task'])
export class Comment extends BaseEntity {
  @ManyToOne(type => Task, { nullable: false })
  @JoinColumn({ name: 'task'})
  public task: Task;

  @Column({ nullable: false, type: 'text' })
  public text: string;
}
