-- CreateTable
CREATE TABLE "Client" (
    "client_id" SERIAL NOT NULL,
    "titre" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "entite_id" INTEGER NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("client_id")
);

-- CreateTable
CREATE TABLE "Facture" (
    "facture_id" SERIAL NOT NULL,
    "date_facturation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_echeance" TIMESTAMP(3) NOT NULL,
    "client_id" INTEGER NOT NULL,
    "entite_id" INTEGER NOT NULL,

    CONSTRAINT "Facture_pkey" PRIMARY KEY ("facture_id")
);

-- CreateTable
CREATE TABLE "Operation" (
    "operation_id" SERIAL NOT NULL,
    "snapshot_prestation" TEXT NOT NULL,
    "snapshot_prix_unitaire" DOUBLE PRECISION NOT NULL,
    "snapshot_tva" DOUBLE PRECISION NOT NULL,
    "quantite" INTEGER NOT NULL,
    "facture_id" INTEGER NOT NULL,
    "prestation_id" INTEGER NOT NULL,

    CONSTRAINT "Operation_pkey" PRIMARY KEY ("operation_id")
);

-- CreateTable
CREATE TABLE "Prestation" (
    "prestation_id" SERIAL NOT NULL,
    "titre" TEXT NOT NULL,
    "prix_unitaire" DOUBLE PRECISION NOT NULL,
    "entite_id" INTEGER NOT NULL,
    "categorie_id" INTEGER NOT NULL,

    CONSTRAINT "Prestation_pkey" PRIMARY KEY ("prestation_id")
);

-- CreateTable
CREATE TABLE "Categorie" (
    "categorie_id" SERIAL NOT NULL,
    "titre" TEXT NOT NULL,
    "tva_id" INTEGER NOT NULL,
    "entite_id" INTEGER NOT NULL,

    CONSTRAINT "Categorie_pkey" PRIMARY KEY ("categorie_id")
);

-- CreateTable
CREATE TABLE "TVA" (
    "tva_id" SERIAL NOT NULL,
    "titre" TEXT NOT NULL,
    "taux" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "TVA_pkey" PRIMARY KEY ("tva_id")
);

-- CreateTable
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "entite_id" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Entite" (
    "entite_id" SERIAL NOT NULL,
    "titre" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "site" TEXT NOT NULL,

    CONSTRAINT "Entite_pkey" PRIMARY KEY ("entite_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_titre_key" ON "Client"("titre");

-- CreateIndex
CREATE UNIQUE INDEX "Prestation_titre_key" ON "Prestation"("titre");

-- CreateIndex
CREATE UNIQUE INDEX "Categorie_titre_key" ON "Categorie"("titre");

-- CreateIndex
CREATE UNIQUE INDEX "TVA_titre_key" ON "TVA"("titre");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Entite_titre_key" ON "Entite"("titre");

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_entite_id_fkey" FOREIGN KEY ("entite_id") REFERENCES "Entite"("entite_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Facture" ADD CONSTRAINT "Facture_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "Client"("client_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Facture" ADD CONSTRAINT "Facture_entite_id_fkey" FOREIGN KEY ("entite_id") REFERENCES "Entite"("entite_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Operation" ADD CONSTRAINT "Operation_facture_id_fkey" FOREIGN KEY ("facture_id") REFERENCES "Facture"("facture_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Operation" ADD CONSTRAINT "Operation_prestation_id_fkey" FOREIGN KEY ("prestation_id") REFERENCES "Prestation"("prestation_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prestation" ADD CONSTRAINT "Prestation_entite_id_fkey" FOREIGN KEY ("entite_id") REFERENCES "Entite"("entite_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prestation" ADD CONSTRAINT "Prestation_categorie_id_fkey" FOREIGN KEY ("categorie_id") REFERENCES "Categorie"("categorie_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Categorie" ADD CONSTRAINT "Categorie_tva_id_fkey" FOREIGN KEY ("tva_id") REFERENCES "TVA"("tva_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Categorie" ADD CONSTRAINT "Categorie_entite_id_fkey" FOREIGN KEY ("entite_id") REFERENCES "Entite"("entite_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_entite_id_fkey" FOREIGN KEY ("entite_id") REFERENCES "Entite"("entite_id") ON DELETE RESTRICT ON UPDATE CASCADE;
