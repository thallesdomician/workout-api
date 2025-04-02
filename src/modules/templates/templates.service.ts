import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTemplateDto } from '../../common/dtos/templates/create-template.dto';

@Injectable()
export class TemplatesService {
  constructor(private prisma: PrismaService) {}

  async findAll(userId: string) {
    return this.prisma.workoutTemplate.findMany({
      where: {
        OR: [
          { userId: null }, // templates padrão
          { userId },
        ],
      },
      include: {
        exercises: {
          include: {
            sets: true,
            exercise: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(userId: string, dto: CreateTemplateDto) {
    return this.prisma.workoutTemplate.create({
      data: {
        userId,
        title: dto.title,
        exercises: {
          create: dto.exercises.map((exercise, idx) => ({
            exerciseId: exercise.exerciseId,
            order: idx,
            sets: {
              create: exercise.sets,
            },
          })),
        },
      },
      include: {
        exercises: {
          include: {
            sets: true,
            exercise: true,
          },
        },
      },
    });
  }

  async delete(userId: string, id: string) {
    const template = await this.prisma.workoutTemplate.findUnique({
      where: { id },
    });

    if (!template) {
      throw new NotFoundException('Template não encontrado.');
    }

    if (template.userId !== userId) {
      throw new ForbiddenException('Você não pode excluir este template.');
    }

    return this.prisma.workoutTemplate.delete({ where: { id } });
  }
}
