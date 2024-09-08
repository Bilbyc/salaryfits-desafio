-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USUARIO', 'ADMIN');

-- CreateTable
CREATE TABLE "Conta" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "papel" "Role" NOT NULL,

    CONSTRAINT "Conta_pkey" PRIMARY KEY ("id")
);
