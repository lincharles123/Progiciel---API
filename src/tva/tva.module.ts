import { Module } from '@nestjs/common';
import { TvaController } from './tva.controller';
import { TvaService } from './tva.service';

@Module({
  controllers: [TvaController],
  providers: [TvaService]
})
export class TvaModule {}
