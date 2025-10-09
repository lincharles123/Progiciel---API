import { Controller, Get } from '@nestjs/common';
import { TvaService } from './tva.service';
import { Public } from 'src/decorator/public.decorator';


@Controller('tva')
export class TvaController {
  constructor(private readonly tvaService: TvaService) {}

  @Public()
  @Get()
  async findAll() {
    return await this.tvaService.findAll();
  }
}
