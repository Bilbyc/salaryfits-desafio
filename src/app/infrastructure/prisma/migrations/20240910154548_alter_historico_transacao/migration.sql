/*
  Warnings:

  - You are about to drop the column `TipoOperacao` on the `HistoricoTransacao` table. All the data in the column will be lost.
  - Added the required column `tipoOperacao` to the `HistoricoTransacao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HistoricoTransacao" DROP COLUMN "TipoOperacao",
ADD COLUMN     "tipoOperacao" "TipoOperacao" NOT NULL;
