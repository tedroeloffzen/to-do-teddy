import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class LabelInput {
  @IsNotEmpty()
  @Field(returns => String, { nullable: false })
  public name: string;
}
