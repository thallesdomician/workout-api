import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  // Lista todos os exercícios (público: padrão + custom do usuário se logado)
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req) {
    return this.exercisesService.findAll(req.user.userId);
  }

  // Cria exercício customizado (privado)
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Request() req, @Body() dto: CreateExerciseDto) {
    return this.exercisesService.create(req.user.userId, dto);
  }

  // Remove exercício customizado (privado)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Request() req, @Param('id') id: string) {
    return this.exercisesService.delete(req.user.userId, id);
  }
}
