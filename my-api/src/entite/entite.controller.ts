import { Request, Param, Get, Post, Body, Controller } from '@nestjs/common';
import { EntiteService } from './entite.service';
import { Public } from '../decorator/public.decorator';

@Controller('entite')
export class EntiteController {
  constructor(private readonly entiteService: EntiteService) {}

  @Public()
  @Post('create')
  async createEntite(@Body() body) {
    return await this.entiteService.create(body);
  }

  @Public()
  @Get(':entite_id')
  async findById(@Param('entite_id') id: number) {
    return await this.entiteService.findById(+id);
  }

  @Public()
  @Get()
  async findAll() {
    return await this.entiteService.findAll();
  }
}
