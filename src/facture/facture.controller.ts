import { Param, Request, Controller, Post, Get, Res, HttpStatus } from '@nestjs/common';
import { FactureService } from './facture.service';
import type { Response } from 'express';

@Controller('facture')
export class FactureController {
  constructor(private readonly factureService: FactureService) {}

  @Post('create')
  async createFacture(@Request() req) {
    const data = {
      ...req.body,
      entiteId: req.user?.entiteId,
    };
    return await this.factureService.create(data);
  }

  @Get()
  async findAll(@Request() req) {
    return await this.factureService.findAll(req.user?.entiteId);
  }

  @Get('generate-pdf/:facture_id')
  async generatePdf(@Param('facture_id') facture_id: number) {
    return await this.factureService.generatePdf(+facture_id);
  }

  @Get(':id/pdf')
  async downloadPdf(@Param('id') id: string, @Res() res: Response) {
    const facture_id = Number(id);
    // ...validate facture_id if needed...
    const pdfBuffer = await this.factureService.generatePdf(facture_id);
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="facture_${facture_id}.pdf"`,
      'Content-Length': pdfBuffer.length,
    });
    return res.status(HttpStatus.OK).send(pdfBuffer);
  }
}
