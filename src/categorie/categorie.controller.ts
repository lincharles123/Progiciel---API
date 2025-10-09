import { Request, Controller, Get, Post, Req } from '@nestjs/common';
import { CategorieService } from './categorie.service';

@Controller('categorie')
export class CategorieController {
  constructor(private readonly categorieService: CategorieService) {}

  @Post('create')
  async createCategorie(@Request() req): Promise<any> {
    const data = {
      ...req.body,
      entite_id: req.user?.entite_id,
    };
    return await this.categorieService.create(data);
  }

  @Get()
  async findAll(@Request() req) {
    return await this.categorieService.findAll(req.user.entite_id);
  }
}
