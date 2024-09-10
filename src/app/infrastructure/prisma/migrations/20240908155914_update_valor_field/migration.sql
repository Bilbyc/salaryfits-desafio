/*
  Warnings:

  - Added the required column `valor` to the `Transacao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transacao" ADD COLUMN     "valor" DECIMAL(9,2) NOT NULL;
