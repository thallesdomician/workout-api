import { Module } from '@nestjs/common';
import { LimitsService } from './limits.service';

@Module({
  providers: [LimitsService]
})
export class LimitsModule {}
