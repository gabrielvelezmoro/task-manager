import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskDTO, TaskStatusEnum } from './task.dto';
import { PrismaService } from '../prisma.service';
import { error } from 'console';

@Injectable()
export class TaskService {
  private readonly prisma: PrismaService;

  create(task: TaskDTO) {
    task.status = TaskStatusEnum.PENDING;
    try {
      const response = this.prisma.task.create({ data: task });
      console.log(response);
      return response;
    } catch (e) {
      console.log(error);
      throw new e();
    }
  }

  async findById(id: string) {
    const foundTask = await this.prisma.task.findMany({ where: { id } });

    if (foundTask.length >= 0) {
      return foundTask;
    }
    throw new NotFoundException('Task not found');
  }

  async findAll() {
    try {
      const foundTask = await this.prisma.task.findMany();
      return foundTask;
    } catch {
      throw new NotFoundException('Task not found');
    }
  }

  async update(id: string, task: TaskDTO) {
    try {
      await this.prisma.task.update({ where: { id }, data: { ...task } });
    } catch {
      throw new NotFoundException('Task not found');
    }
  }

  delete(id: string) {
    try {
      this.prisma.task.delete({ where: { id } });
    } catch {
      throw new NotFoundException('Task not found');
    }
  }
}
