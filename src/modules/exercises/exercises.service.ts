import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateExerciseDto } from '../../common/dtos/exercises/create-exercise.dto';

@Injectable()
export class ExercisesService {
  constructor(private prisma: PrismaService) {}

  async findAll(userId?: string) {
    return this.prisma.exercise.findMany({
      where: {
        OR: [
          { userId: null }, // exercícios padrão do sistema
          { userId: userId || undefined }, // exercícios custom do usuário
        ],
      },
      orderBy: { name: 'asc' },
    });
  }

  async create(userId: string, dto: CreateExerciseDto) {
    return this.prisma.exercise.create({
      data: {
        ...dto,
        userId,
      },
    });
  }

  async delete(userId: string, id: string) {
    const exercise = await this.prisma.exercise.findUnique({ where: { id } });

    if (!exercise) {
      throw new NotFoundException('Exercício não encontrado.');
    }

    if (exercise.userId !== userId) {
      throw new ForbiddenException('Você não pode excluir este exercício.');
    }

    return this.prisma.exercise.delete({ where: { id } });
  }
}
