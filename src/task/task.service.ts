import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskDTO, TaskStatusEnum } from './task.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TaskService {
  private tasks: TaskDTO[] = [];
  create(task: TaskDTO) {
    task.id = uuid();
    task.status = TaskStatusEnum.PENDING;
    this.tasks.push(task);
  }

  findById(id: string): TaskDTO {
    const foundTask = this.tasks.filter((t) => t.id == id);

    if (foundTask.length) {
      return foundTask[0];
    }
    throw new NotFoundException('Task not found');
  }

  findAll(): TaskDTO[] {
    return this.tasks;
  }

  update(id: string, task: TaskDTO) {
    const taskIndex = this.tasks.findIndex((t) => t.id === id);

    task.id = id;

    if (taskIndex >= 0) {
      this.tasks[taskIndex] = task;
      console.log(this.tasks[taskIndex]);
    }
    throw new NotFoundException('Task not found');
  }

  delete(id: string) {
    const taskIndex = this.tasks.findIndex((t) => t.id === id);

    if (taskIndex >= 0) {
      this.tasks.splice(taskIndex, 1);
      return;
    }
    throw new NotFoundException('Task not found');
  }
}
