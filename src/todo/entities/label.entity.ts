import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';
import { Task } from './task.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Label extends BaseEntity {
  @Field(returns => String, { nullable: false })
  @Column({ nullable: false, type: 'varchar' })
  public name: string;

  @Field(returns => [Task], { nullable: 'items' })
  @ManyToMany(type => Task, task => task.labels, { lazy: true })
  public tasks: Promise<Task[]>;
}
