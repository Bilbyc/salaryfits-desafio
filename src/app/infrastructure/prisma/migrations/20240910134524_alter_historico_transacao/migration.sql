/*
  Warnings:

  - You are about to drop the column `tipoTransacao` on the `HistoricoTransacao` table. All the data in the column will be lost.
  - Added the required column `TipoOperacao` to the `HistoricoTransacao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HistoricoTransacao" DROP COLUMN "tipoTransacao",
ADD COLUMN     "TipoOperacao" "TipoOperacao" NOT NULL;
