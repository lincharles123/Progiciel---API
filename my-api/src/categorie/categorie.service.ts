import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Categorie, Prisma } from '@prisma/client';

@Injectable()
export class CategorieService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(entite_id: number): Promise<Categorie[]> {
    return this.prisma.categorie.findMany({
      where: { entite_id },
    });
  }

  async create(data: Prisma.CategorieCreateInput): Promise<Categorie> {
    try {
      return await this.prisma.categorie.create({
        data,
      });
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        throw new BadRequestException('Categorie already exists');
      }
      throw e;
    }
  }
}
