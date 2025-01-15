/*
  Warnings:

  - Added the required column `tiendaId` to the `Articulo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Articulo" ADD COLUMN     "tiendaId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Articulo" ADD CONSTRAINT "Articulo_tiendaId_fkey" FOREIGN KEY ("tiendaId") REFERENCES "Tienda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
