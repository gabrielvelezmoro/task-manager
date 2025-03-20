import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskDTO, TaskStatusEnum } from './task.dto';
import { PrismaService } from '../prisma.service';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  async create(task: TaskDTO, userId: string) {
    task.id = uuid();
    task.status = TaskStatusEnum.PENDING;
    const response = await this.prisma.task.create({
      data: {
        ...task,
        due_date: new Date(task.due_date).toISOString(),
        user_id: userId,
      },
    });
    return response;
  }

  async findById(id: string, user_id: string) {
    const foundTask = await this.prisma.task.findMany({
      where: { id, user_id },
    });

    if (foundTask.length >= 0) {
      return foundTask;
    }
    throw new NotFoundException('Task not found');
  }

  async findAll(user_id: string) {
    try {
      const foundTask = await this.prisma.task.findMany({ where: { user_id } });
      return foundTask;
    } catch {
      throw new NotFoundException('Tasks not found');
    }
  }

  async update(id: string, task: TaskDTO, user_id: string) {
    try {
      await this.prisma.task.update({
        where: { id, user_id },
        data: {
          ...task,
          due_date: new Date(task.due_date).toISOString(),
        },
      });
    } catch {
      throw new NotFoundException('Task not found');
    }
  }

  async delete(id: string, user_id: string) {
    try {
      await this.prisma.task.delete({ where: { id, user_id } });
    } catch {
      throw new NotFoundException('Task not found');
    }
  }
}
