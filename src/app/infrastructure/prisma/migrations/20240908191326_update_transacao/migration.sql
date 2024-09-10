/*
  Warnings:

  - Added the required column `destinatario_id` to the `Transacao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transacao" ADD COLUMN     "destinatario_id" INTEGER NOT NULL;
