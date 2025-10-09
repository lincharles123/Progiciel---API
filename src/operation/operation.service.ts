import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class OperationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.OperationCreateInput) {
    return this.prisma.operation.create({
      data,
    });
  }

  getAllOfFacture(facture_id: number) {
    return this.prisma.operation.findMany({
      where: { facture_id },
    });
  }
}
