import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class ProjectInput {
  @IsNotEmpty()
  @Field(returns => String, { nullable: false })
  public name: string;

  @IsOptional()
  @Field(returns => Int, { nullable: true })
  public parentProjectId: number;
}
