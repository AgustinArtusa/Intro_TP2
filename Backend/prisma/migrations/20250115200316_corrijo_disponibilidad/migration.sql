/*
  Warnings:

  - You are about to drop the column `disponible` on the `Articulo` table. All the data in the column will be lost.
  - You are about to drop the column `tiendaId` on the `Articulo` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Articulo" DROP CONSTRAINT "Articulo_tiendaId_fkey";

-- AlterTable
ALTER TABLE "Articulo" DROP COLUMN "disponible",
DROP COLUMN "tiendaId";

-- CreateTable
CREATE TABLE "Disponibilidad" (
    "id" SERIAL NOT NULL,
    "articuloId" INTEGER NOT NULL,
    "tiendaId" INTEGER NOT NULL,
    "disponible" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Disponibilidad_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Disponibilidad_articuloId_tiendaId_key" ON "Disponibilidad"("articuloId", "tiendaId");

-- AddForeignKey
ALTER TABLE "Disponibilidad" ADD CONSTRAINT "Disponibilidad_articuloId_fkey" FOREIGN KEY ("articuloId") REFERENCES "Articulo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Disponibilidad" ADD CONSTRAINT "Disponibilidad_tiendaId_fkey" FOREIGN KEY ("tiendaId") REFERENCES "Tienda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
