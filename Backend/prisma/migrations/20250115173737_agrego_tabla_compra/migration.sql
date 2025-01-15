-- AlterTable
ALTER TABLE "Articulo" ADD COLUMN     "disponible" BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE "Compra" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "articuloId" INTEGER NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Compra_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Compra_usuarioId_articuloId_key" ON "Compra"("usuarioId", "articuloId");

-- AddForeignKey
ALTER TABLE "Compra" ADD CONSTRAINT "Compra_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Compra" ADD CONSTRAINT "Compra_articuloId_fkey" FOREIGN KEY ("articuloId") REFERENCES "Articulo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
