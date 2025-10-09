import {
  Param,
  Request,
  Controller,
  Post,
  Get,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { FactureService } from './facture.service';
import { OperationService } from 'src/operation/operation.service';


@Controller('facture')
export class FactureController {
  constructor(
    private readonly factureService: FactureService,
    private readonly operationService: OperationService
  ) {}

  @Post('create')
  async createFacture(@Request() req) {
    const data = {
      ...req.body,
      entite_id: req.user?.entite_id,
    };
    return await this.factureService.create(data);
  }

  @Get()
  async findAll(@Request() req) {
    const data = await this.factureService.findAll(req.user?.entite_id);
    return data.map((facture) => ({
      ...facture,
      date_facturation: new Date(facture.date_facturation).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }),
      date_echeance: new Date(facture.date_echeance).toLocaleDateString('fr-FR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        }),
      })
    );
  }

  @Get(':id/pdf')
  async downloadPdf(@Param('id') id: string) {
    const facture_id = Number(id);

    const data = await this.factureService.generatePdf(facture_id);
    return data;
  }
}
