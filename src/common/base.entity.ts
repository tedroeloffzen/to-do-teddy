import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
export abstract class BaseEntity {

  @Field(() => Int)
  @PrimaryGeneratedColumn()
  public id: number;

  @Field(() => GraphQLISODateTime)
  @CreateDateColumn({
    type: 'timestamp'
  })
  public createdAt: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @UpdateDateColumn({
    type: 'timestamp'
  })
  public lastModifiedAt?: Date;
}
