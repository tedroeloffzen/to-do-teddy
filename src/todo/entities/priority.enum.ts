import { registerEnumType } from '@nestjs/graphql';

export enum PriorityEnum {
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low'
}

registerEnumType(PriorityEnum, {
  name: 'Priority',
  description: 'The priority of a task'
});
