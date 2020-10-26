import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';
import { Task } from './task.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
@Index(['parentProject'])
export class Project extends BaseEntity {
  @Field(type => String)
  @Column( { nullable: false, type: 'varchar' })
  public name: string;

  @Field(type => Boolean)
  @Column( { nullable: false, type: 'boolean' })
  public deletable: boolean;

  @ManyToOne(type => Project, project => project.childProjects)
  @JoinColumn({ name: 'parentProject'})
  public parentProject?: Project;

  @OneToMany(type => Project,
      project => project.parentProject,
    { lazy: true })
  public childProjects: Promise<Project[]>;

  @OneToMany(type => Task, task => task.project, { lazy: true })
  public tasks: Promise<Task[]>;
}
