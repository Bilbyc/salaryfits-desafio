/*
  Warnings:

  - You are about to drop the column `date` on the `HistoricoTransacao` table. All the data in the column will be lost.
  - Added the required column `dataTransacao` to the `HistoricoTransacao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HistoricoTransacao" DROP COLUMN "date",
ADD COLUMN     "dataTransacao" TIMESTAMP(3) NOT NULL;
