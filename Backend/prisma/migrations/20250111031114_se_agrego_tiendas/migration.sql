-- CreateTable
CREATE TABLE "Tienda" (
    "id" SERIAL NOT NULL,
    "ubicacion" TEXT NOT NULL,
    "horario" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "telefono" INTEGER NOT NULL,
    "email_contacto" TEXT NOT NULL,

    CONSTRAINT "Tienda_pkey" PRIMARY KEY ("id")
);
