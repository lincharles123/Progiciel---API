import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma, Client } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ClientService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.ClientCreateInput): Promise<Client> {
    try {
      return await this.prisma.client.create({
        data,
      });
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        throw new BadRequestException('Client already exists');
      }
      throw e;
    }
  }
  async findAll(entite_id: number): Promise<Client[]> {
    return this.prisma.client.findMany({
      where: { entite_id },
    });
  }
}
