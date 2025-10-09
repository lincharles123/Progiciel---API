import { Module } from '@nestjs/common';
import { FactureController } from './facture.controller';
import { FactureService } from './facture.service';
import { OperationModule } from 'src/operation/operation.module';

@Module({
  imports: [OperationModule],
  controllers: [FactureController],
  providers: [FactureService],
})
export class FactureModule {}
