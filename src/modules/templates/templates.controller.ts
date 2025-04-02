import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common';
import { TemplatesService } from './templates.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { CreateTemplateDto } from '../../common/dtos/templates/create-template.dto';

@UseGuards(JwtAuthGuard)
@Controller('templates')
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  @Get()
  async findAll(@Request() req) {
    return this.templatesService.findAll(req.user.userId);
  }

  @Post()
  async create(@Request() req, @Body() dto: CreateTemplateDto) {
    return this.templatesService.create(req.user.userId, dto);
  }

  @Delete(':id')
  async delete(@Request() req, @Param('id') id: string) {
    return this.templatesService.delete(req.user.userId, id);
  }
}
