import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const entite = await prisma.entite.create({
    data: {
      titre: 'Okayo SAS',
      address: '35 Rue du Général Foy, 75008 Paris',
      telephone: '01 80 88 63 00',
      email: 'contact@okayo-sas.example',
      site: 'https://okayo-sas.example',
    },
  });

  const tva20 = await prisma.tVA.create({
    data: {
      titre: 'TVA 20',
      taux: 20.0,
    },
  });
  const tva55 = await prisma.tVA.create({
    data: {
      titre: 'TVA 5.5',
      taux: 5.5,
    },
  });

  const categorieA = await prisma.categorie.create({
    data: {
      titre: 'categorie A',
      entite_id: entite.entite_id,
      tva_id: tva20.tva_id,
    },
  });
  const categorieB = await prisma.categorie.create({
    data: {
      titre: 'categorie B',
      entite_id: entite.entite_id,
      tva_id: tva55.tva_id,
    },
  });

  const client = await prisma.client.create({
    data: {
      titre: 'Client Demo',
      address: '10 Avenue Client, 75000 Paris',
      entite_id: entite.entite_id,
    },
  });

  const facture = await prisma.facture.create({
    data: {
      entite_id: entite.entite_id,
      client_id: client.client_id,
      date_facturation: new Date(),
      date_echeance: new Date(new Date().setDate(new Date().getDate() + 30)),
    }
  });

  const prestationA = await prisma.prestation.create({
    data: {
      titre: 'Prestation A',
      prix_unitaire: 10000.0,
      entite_id: entite.entite_id,
      categorie_id: categorieA.categorie_id,
    },
  });

  const prestationB = await prisma.prestation.create({
    data: {
      titre: 'Prestation B',
      prix_unitaire: 5000.0,
      entite_id: entite.entite_id,
      categorie_id: categorieB.categorie_id,
    },
  });

  const prestationC = await prisma.prestation.create({
    data: {
      titre: 'Prestation C',
      prix_unitaire: 2500.0,
      entite_id: entite.entite_id,
      categorie_id: categorieA.categorie_id,
    },
  });
  
  await prisma.operation.createMany({
    data: [
      {
        snapshot_prestation: prestationA.titre,
        snapshot_prix_unitaire: prestationA.prix_unitaire,
        snapshot_tva: 20.0,
        quantite: 2,
        facture_id: facture.facture_id,
        prestation_id: prestationA.prestation_id,
      },
      {
        snapshot_prestation: prestationB.titre,
        snapshot_prix_unitaire: prestationB.prix_unitaire,
        snapshot_tva: 5.5,
        quantite: 1,
        facture_id: facture.facture_id,
        prestation_id: prestationB.prestation_id,
      },
      {
        snapshot_prestation: prestationC.titre,
        snapshot_prix_unitaire: prestationC.prix_unitaire,
        snapshot_tva: 20.0,
        quantite: 5,
        facture_id: facture.facture_id,
        prestation_id: prestationC.prestation_id,
      },
    ],
    skipDuplicates: true,
  });
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
