import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';
import { Task } from './task.entity';

@Entity()
export class Label extends BaseEntity {
  @Column({ nullable: false, type: 'varchar' })
  public name: string;

  @ManyToMany(type => Task, task => task.labels, { lazy: true })
  public tasks: Promise<Task[]>;
}
