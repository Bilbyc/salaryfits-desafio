/*
  Warnings:

  - Added the required column `contaId` to the `Transacao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Conta" ADD COLUMN     "ativada" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Transacao" ADD COLUMN     "contaId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Transacao" ADD CONSTRAINT "Transacao_contaId_fkey" FOREIGN KEY ("contaId") REFERENCES "Conta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
