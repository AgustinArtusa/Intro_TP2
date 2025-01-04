/*
  Warnings:

  - You are about to drop the `Articulos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Articulos";

-- CreateTable
CREATE TABLE "Articulo" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "precio" DECIMAL(65,30) NOT NULL,
    "descripcion" TEXT NOT NULL,
    "origen" TEXT NOT NULL,
    "antiguedad" TEXT NOT NULL,

    CONSTRAINT "Articulo_pkey" PRIMARY KEY ("id")
);
