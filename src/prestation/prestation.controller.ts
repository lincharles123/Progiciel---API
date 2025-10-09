import { Request, Controller, Post, Get } from '@nestjs/common';
import { PrestationService } from './prestation.service';

@Controller('prestation')
export class PrestationController {
  constructor(private readonly prestationService: PrestationService) {}

  @Post('create')
  async createPrestation(@Request() req) {
    const data = {
      ...req.body,
      entite_id: req.user?.entite_id, // use DB field name
    };
    return await this.prestationService.create(data);
  }

  @Get()
  async findAll(@Request() req) {
    const entite_id = req.user?.entite_id; // use DB field name
    return await this.prestationService.findAll(entite_id);
  }
}
