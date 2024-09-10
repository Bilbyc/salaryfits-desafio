-- CreateEnum
CREATE TYPE "TipoOperacao" AS ENUM ('DEPOSITO', 'SAQUE', 'TRANSFERENCIA');

-- CreateEnum
CREATE TYPE "StatusTransacao" AS ENUM ('ACEITA', 'RECUSADA');

-- CreateTable
CREATE TABLE "Transacao" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "tipoOperacao" "TipoOperacao" NOT NULL,
    "dataTransacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "StatusTransacao" NOT NULL,

    CONSTRAINT "Transacao_pkey" PRIMARY KEY ("id")
);
