import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskDTO, TaskStatusEnum } from './task.dto';
import { PrismaService } from '../prisma.service';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  async create(task: TaskDTO) {
    task.id = uuid();
    task.status = TaskStatusEnum.PENDING;
    const response = await this.prisma.task.create({
      data: { ...task, due_date: new Date(task.due_date).toISOString() },
    });
    return response;
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
      throw new NotFoundException('Tasks not found');
    }
  }

  async update(id: string, task: TaskDTO) {
    try {
      await this.prisma.task.update({
        where: { id },
        data: {
          ...task,
          due_date: new Date(task.due_date).toISOString(),
        },
      });
    } catch {
      throw new NotFoundException('Task not found');
    }
  }

  async delete(id: string) {
    try {
      await this.prisma.task.delete({ where: { id } });
    } catch {
      throw new NotFoundException('Task not found');
    }
  }
}
