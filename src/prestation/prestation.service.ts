import { BadRequestException, Injectable } from '@nestjs/common';
import { Prestation, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PrestationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.PrestationCreateInput): Promise<Prestation> {
    try {
      return await this.prisma.prestation.create({
        data,
      });
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        throw new BadRequestException('Prestation already exists');
      }
      throw e;
    }
  }

  async findAll(entite_id: number): Promise<Prestation[]> {
    return this.prisma.prestation.findMany({
      where: { entite_id },
    });
  }
}
