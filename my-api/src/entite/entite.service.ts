import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Entite, Prisma } from '@prisma/client';

@Injectable()
export class EntiteService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.EntiteCreateInput): Promise<Entite> {
    try {
      return await this.prisma.entite.create({
        data,
      });
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        throw new BadRequestException('Facture already exists');
      }
      throw e;
    }
  }

  async findAll(): Promise<Entite[]> {
    return this.prisma.entite.findMany();
  }

  async findById(entite_id: number): Promise<Entite | null> {
    return this.prisma.entite.findUnique({
      where: { entite_id },
    });
  }
}
