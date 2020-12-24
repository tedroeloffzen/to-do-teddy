import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { Project } from './project.entity';
import { PriorityEnum } from './priority.enum';
import { BaseEntity } from '../../common/base.entity';
import { Label } from './label.entity';
import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Task extends BaseEntity {
  @Field(() => String)
  @Column( { nullable: false, type: 'text' })
  public description: string;

  @Field(() => Boolean)
  @Column({ nullable: false, type: 'boolean'})
  public completed = false;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @Column( { nullable: true, type: 'date' })
  public dueDate?: Date;

  @Field(() => Project, { nullable: true })
  @ManyToOne(type => Project, { nullable: true, eager: true })
  @JoinColumn({ name: 'project'})
  public project?: Project;

  @Field(() => PriorityEnum, { nullable: true })
  @Column('enum', { nullable: true, enumName: 'PriorityEnum', enum: PriorityEnum })
  public priority?: PriorityEnum;

  @Field(returns => [Label], { nullable: 'items' })
  @ManyToMany(type => Label, label => label.tasks, { cascade: true })
  @JoinTable({
    name: 'task_label',
    joinColumn: {
      name: 'task'
    },
    inverseJoinColumn: {
      name: 'label'
    }
  })
  public labels: Label[];
}
