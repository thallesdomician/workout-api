import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateMeasurementDto } from '../../common/dtos/measurements/create-measurement.dto';

@Injectable()
export class MeasurementsService {
  constructor(private prisma: PrismaService) {}

  async findAll(userId: string) {
    return this.prisma.measurement.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
    });
  }

  async findAllLast(userId: string) {
    return this.prisma.measurement.findFirst({
      where: { userId },
      distinct: ['type'],
      orderBy: { date: 'desc' },
    });
  }

  async create(userId: string, dto: CreateMeasurementDto) {
    return this.prisma.measurement.create({
      data: {
        ...dto,
        userId,
        date: new Date(dto.date),
      },
    });
  }

  async delete(userId: string, id: string) {
    const measurement = await this.prisma.measurement.findUnique({
      where: { id },
    });

    if (!measurement) {
      throw new NotFoundException('Medição não encontrada.');
    }

    if (measurement.userId !== userId) {
      throw new ForbiddenException('Você não pode excluir essa medição.');
    }

    return this.prisma.measurement.delete({ where: { id } });
  }
}
