import {
  Controller,
  Get,
  Patch,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  getProfile(@Request() req) {
    return this.usersService.getProfile(req.user.userId);
  }

  @Patch('me')
  updateProfile(
    @Request() req,
    @Body() data: { name?: string; avatarUrl?: string },
  ) {
    return this.usersService.updateProfile(req.user.userId, data);
  }
}
