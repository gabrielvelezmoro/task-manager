import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskDTO, TaskStatusEnum } from './task.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  async create(task: TaskDTO, userId: string) {
    task.status = TaskStatusEnum.PENDING;
    const response = await this.prisma.task.create({
      data: {
        ...task,
        due_date: new Date(task.due_date),
        created_at: new Date(),
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

  async findAll(user_id: string, status?: string, search?: string) {
    try {
      if (status) {
        const foundTask = await this.prisma.task.findMany({
          where: { user_id, status },
        });
        return foundTask;
      } else if (search)
        if (search) {
          const foundTask = await this.prisma.task.findMany({
            where: {
              OR: [{ title: search }, { description: search }],
              AND: [{ user_id }],
            },
          });
          return foundTask;
        }
      const foundTask = await this.prisma.task.findMany({
        where: { user_id },
      });
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
          due_date: new Date(task.due_date),
          updated_at: new Date(),
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
