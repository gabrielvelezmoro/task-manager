import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export enum TaskStatusEnum {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export class TaskDTO {
  @IsUUID()
  @IsOptional()
  id: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsEnum(TaskStatusEnum)
  @IsOptional()
  status: string;

  @IsDateString()
  due_date: Date;
}

export interface FindAllDTO {
  title: string;
  status: string;
  userId: string;
}
