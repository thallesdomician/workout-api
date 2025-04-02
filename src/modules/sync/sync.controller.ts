import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { SyncService } from './sync.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { SyncPushDto } from '../../common/dtos/sync/sync-push.dto';

@UseGuards(JwtAuthGuard)
@Controller('sync')
export class SyncController {
  constructor(private readonly syncService: SyncService) {}

  @Post('bootstrap')
  async bootstrap(@Request() req) {
    const userId = req.user.userId;
    return this.syncService.getBootstrapData(userId);
  }

  @Post('push')
  async push(@Request() req, @Body() dto: SyncPushDto) {
    return this.syncService.pushData(req.user.userId, dto);
  }
}
