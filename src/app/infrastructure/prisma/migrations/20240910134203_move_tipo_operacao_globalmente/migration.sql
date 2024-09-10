-- CreateTable
CREATE TABLE "HistoricoTransacao" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "contaId" INTEGER NOT NULL,
    "transacaoId" INTEGER NOT NULL,
    "tipoTransacao" "TipoOperacao" NOT NULL,

    CONSTRAINT "HistoricoTransacao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HistoricoTransacao_transacaoId_key" ON "HistoricoTransacao"("transacaoId");

-- AddForeignKey
ALTER TABLE "HistoricoTransacao" ADD CONSTRAINT "HistoricoTransacao_contaId_fkey" FOREIGN KEY ("contaId") REFERENCES "Conta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoricoTransacao" ADD CONSTRAINT "HistoricoTransacao_transacaoId_fkey" FOREIGN KEY ("transacaoId") REFERENCES "Transacao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
