import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';

export enum TaskStatusEnum {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export class TaskDTO {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsEnum(TaskStatusEnum)
  @IsOptional()
  status: string;

  @IsDateString()
  due_date: Date;

  @IsString()
  content: string;
}

export interface FindAllDTO {
  title: string;
  status: string;
  userId: string;
}
