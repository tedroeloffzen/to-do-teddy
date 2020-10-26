import { Field, GraphQLISODateTime, InputType } from '@nestjs/graphql';
import { IsDate, IsNotEmpty, IsOptional } from 'class-validator';
import { PriorityEnum } from '../../entities/priority.enum';

@InputType()
export class TaskInput {
  @IsNotEmpty()
  @Field(() => String)
  public description: string;

  @IsOptional()
  @IsDate()
  @Field(() => GraphQLISODateTime, { nullable: true })
  public dueDate?: Date;

  @IsOptional()
  @Field(() => PriorityEnum, { nullable: true })
  public priority?: PriorityEnum;
}
