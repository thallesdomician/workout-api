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
import { WorkoutsService } from './workouts.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { CreateWorkoutDto } from '../../common/dtos/workout/create-workout.dto';

@UseGuards(JwtAuthGuard)
@Controller('workouts')
export class WorkoutsController {
  constructor(private readonly workoutsService: WorkoutsService) {}

  @Get()
  async findAll(@Request() req) {
    return this.workoutsService.findAll(req.user.userId);
  }

  @Post()
  async create(@Request() req, @Body() dto: CreateWorkoutDto) {
    return this.workoutsService.create(req.user.userId, dto);
  }

  @Delete(':id')
  async delete(@Request() req, @Param('id') id: string) {
    return this.workoutsService.delete(req.user.userId, id);
  }
}
