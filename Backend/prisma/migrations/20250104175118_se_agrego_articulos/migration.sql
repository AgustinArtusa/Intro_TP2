-- CreateTable
CREATE TABLE "Articulos" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "precio" DECIMAL(65,30) NOT NULL,
    "descripcion" TEXT NOT NULL,
    "origen" TEXT NOT NULL,
    "antiguedad" TEXT NOT NULL,

    CONSTRAINT "Articulos_pkey" PRIMARY KEY ("id")
);
