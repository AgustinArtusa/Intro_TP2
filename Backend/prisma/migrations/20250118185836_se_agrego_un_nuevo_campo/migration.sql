/*
  Warnings:

  - You are about to drop the column `fecha` on the `Compra` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Compra_usuarioId_articuloId_key";

-- AlterTable
ALTER TABLE "Compra" DROP COLUMN "fecha";

-- AlterTable
ALTER TABLE "Disponibilidad" ADD COLUMN     "disponible" BOOLEAN NOT NULL DEFAULT true;
