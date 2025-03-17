import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TaskDTO } from './task.dto';
import { TaskService } from './task.service';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  @Post()
  create(@Body() task: TaskDTO) {
    return this.taskService.create(task);
  }

  @Get('/:id')
  getById(@Param('id') id: string) {
    this.taskService.findById(id);
  }

  @Get()
  findAll() {
    this.taskService.findAll();
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
