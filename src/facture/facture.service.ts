import { BadRequestException, Injectable } from '@nestjs/common';
import { Facture, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import * as fs from 'fs';
import * as puppeteer from 'puppeteer';
import * as Handlebars from 'handlebars';
import * as path from 'path';

@Injectable()
export class FactureService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.FactureCreateInput): Promise<Facture> {
    try {
      return await this.prisma.facture.create({
        data,
      });
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        throw new BadRequestException('Facture already exists');
      }
      throw e;
    }
  }

  async findAll(entite_id: number): Promise<Facture[]> {
    return this.prisma.facture.findMany({
      where: { entite_id },
    });
  }

  async generatePdf(facture_id: number) {
    const facture = await this.prisma.facture.findUnique({
      where: { facture_id },
      include: {
        client: true,
        operation: true,
        entite: true,
      },
    });

    if (!facture) {
      throw new BadRequestException('Facture not found');
    }

    const items = (facture.operation || []).map((op) => {
      const designation = op.snapshot_prestation;
      const puHt = Number(op.snapshot_prix_unitaire);
      const tvaPercent = Number(op.snapshot_tva);
      const quantite = Number(op.quantite);
      const totalHt = puHt * quantite;
      return {
        designation,
        tva: tvaPercent,
        puHt: puHt,
        quantite: quantite,
        totalHt: totalHt,
      };
    });

    const tvaMap = new Map<number, number>();
    items.forEach(item => {
      const itemTva = item.puHt * item.quantite * (item.tva / 100);
      tvaMap.set(item.tva, (tvaMap.get(item.tva) || 0) + itemTva);
    });

    const tvaList = Array.from(tvaMap.entries()).map(([tva, total]) => ({
      tva: tva,
      total: total,
    }));

    console.log(tvaList);
    console.log(items);


    const totalHt = items.reduce((sum, it) => sum + it.totalHt, 0);
    const totalTtc =
      totalHt +
      Array.from(tvaMap.values()).reduce((sum, it) => sum + it, 0);

    const facture_info = {
      facture_id: facture.facture_id,
      date: facture.date_facturation
        ? new Date(facture.date_facturation).toLocaleDateString()
        : '',
      dueDate: facture.date_echeance
        ? new Date(facture.date_echeance).toLocaleDateString()
        : '',
      clientCode: facture.client?.client_id ?? 'ID client',
      clientName: facture.client?.titre ?? 'Titre client',
      clientAddress: facture.client?.address ?? 'Adresse client',
      entiteName: facture.entite?.titre || 'Titre emetteur',
      entiteAddress: facture.entite?.address || 'Adresse emetteur',
      entiteSite: facture.entite?.site || 'www.votre-entreprise.com',
      entiteTel: facture.entite?.telephone || 'xx.xx.xx.xx.xx',
      items,
      tvaList,
      totalHt: totalHt,
      totalTtc: totalTtc,
    };

    const templatePath = path.join(__dirname, 'template', 'facture.hbs');

    if (!fs.existsSync(templatePath)) {
      throw new BadRequestException(`Template not found at ${templatePath}`);
    }
    const htmlTemplate = fs.readFileSync(templatePath, 'utf8');
    const template = Handlebars.compile(htmlTemplate);
    const html = template(facture_info);

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    const pdf = await page.pdf({ format: 'A4', printBackground: true });
    await browser.close();
    return pdf;
  }
}
