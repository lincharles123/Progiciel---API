import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OperationService {
  constructor(private readonly prisma: PrismaService) {}

  getAllOfFacture(facture_id: number) {
    return this.prisma.operation.findMany({
      where: {facture_id },
    });
  }
}
