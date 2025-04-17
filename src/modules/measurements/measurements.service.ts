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
    return this.prisma.measurementEntry.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
      include: {
        measurement: {
          select: {
            unit: true,
            name: true,
          },
        },
      },
    });
  }

  async findAllLast(userId: string) {
    return this.prisma.measurementEntry.findFirst({
      where: { userId },
      distinct: ['measurementId'],
      orderBy: { date: 'desc' },
      include: {
        measurement: {
          select: {
            unit: true,
            name: true,
          },
        },
      },
    });
  }

  async create(userId: string, dto: CreateMeasurementDto) {
    return this.prisma.measurementEntry.create({
      data: {
        ...dto,
        date: new Date(dto.date),
        userId,
      },
    });
  }

  async delete(userId: string, id: string) {
    const measurementEntry = await this.prisma.measurementEntry.findUnique({
      where: { id },
    });

    if (!measurementEntry) {
      throw new NotFoundException('Medição não encontrada.');
    }

    if (measurementEntry.userId !== userId) {
      throw new ForbiddenException('Você não pode excluir essa medição.');
    }

    return this.prisma.measurementEntry.delete({ where: { id } });
  }
}
