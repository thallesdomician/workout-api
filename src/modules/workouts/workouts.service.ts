import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateWorkoutDto } from '../../common/dtos/workout/create-workout.dto';
@Injectable()
export class WorkoutsService {
  constructor(private prisma: PrismaService) {}

  async findAll(userId: string) {
    return this.prisma.workout.findMany({
      where: { userId },
      include: {
        exercises: {
          include: {
            sets: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(userId: string, dto: CreateWorkoutDto) {
    return this.prisma.workout.create({
      data: {
        userId,
        title: dto.title,
        notes: dto.notes,
        createdFromTemplateId: dto.createdFromTemplateId,
        exercises: {
          create: dto.exercises.map((ex, idx) => ({
            exerciseId: ex.exerciseId,
            order: idx,
            nameSnapshot: ex.nameSnapshot,
            bodyPartSnapshot: ex.bodyPartSnapshot,
            categorySnapshot: ex.categorySnapshot,
            instructionsSnapshot: ex.instructionsSnapshot,
            sets: {
              create: ex.sets,
            },
          })),
        },
      },
      include: {
        exercises: {
          include: {
            sets: true,
          },
        },
      },
    });
  }

  async delete(userId: string, id: string) {
    const workout = await this.prisma.workout.findUnique({ where: { id } });

    if (!workout) {
      throw new NotFoundException('Treino não encontrado.');
    }

    if (workout.userId !== userId) {
      throw new ForbiddenException('Você não pode deletar esse treino.');
    }

    return this.prisma.workout.delete({ where: { id } });
  }
}
