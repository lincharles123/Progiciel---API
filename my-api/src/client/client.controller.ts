import { Request, Controller, Post, Get } from '@nestjs/common';
import { ClientService } from './client.service';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post('create')
  async create(@Request() req) {
    const data = {
      ...req.body,
      entiteId: req.user?.entiteId,
    };
    return await this.clientService.create(data);
  }

  @Get()
  async findAll(@Request() req) {
    return await this.clientService.findAll(req.user.entiteId);
  }
}
