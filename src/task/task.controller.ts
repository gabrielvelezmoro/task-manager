import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  Request,
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
  create(@Body() task: TaskDTO, @Request() req) {
    return this.taskService.create(task, req.user.sub);
  }

  @Get('/:id')
  getById(@Param('id') id: string, @Request() req) {
    return this.taskService.findById(id, req.user.sub);
  }

  @Get()
  findAll(@Query('status') status: string, @Request() req) {
    return this.taskService.findAll(req.user.sub, status);
  }

  @Patch('/:id')
  @HttpCode(204)
  update(@Body() task: TaskDTO, @Param('id') id: string, @Request() req) {
    return this.taskService.update(id, task, req.user.sub);
  }

  @Delete('/:id')
  delete(@Param('id') id: string, @Request() req) {
    return this.taskService.delete(id, req.user.sub);
  }
}
