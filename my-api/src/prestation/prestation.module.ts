import { Module } from '@nestjs/common';
import { PrestationController } from './prestation.controller';
import { PrestationService } from './prestation.service';

@Module({
  controllers: [PrestationController],
  providers: [PrestationService],
})
export class PrestationModule {}
