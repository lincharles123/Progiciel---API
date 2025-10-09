import { Module } from '@nestjs/common';
import { EntiteService } from './entite.service';
import { PrismaModule } from '../prisma/prisma.module';
import { EntiteController } from './entite.controller';

@Module({
  imports: [PrismaModule],
  providers: [EntiteService],
  exports: [EntiteService],
  controllers: [EntiteController],
})
export class EntiteModule {}
