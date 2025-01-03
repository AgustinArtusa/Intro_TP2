-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "contraseña" TEXT NOT NULL,
    "dinero" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "telefono" INTEGER NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);
