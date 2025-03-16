import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TaskDTO } from './task.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  @Post()
  create(@Body() task: TaskDTO) {
    this.taskService.create(task);
    console.log(task);
  }

  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.taskService.findById(id);
  }

  @Get()
  findAll(): TaskDTO[] {
    return this.taskService.findAll();
  }

  @Patch('/:id')
  update(@Body() task: TaskDTO, @Param('id') id: string) {
    this.taskService.update(id, task);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    this.taskService.delete(id);
  }
}
