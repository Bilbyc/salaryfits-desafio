import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { IContaRepository } from '../../domain/conta/repositories/iconta.repository';
import { ContaRepository } from './conta.repository';
import { ITransacaoRepository } from '../../domain/transacao/repositories/itransacao.repository';
import { TransacaoRepository } from './transacao.repository';
import { IHistoricoTransacaoRepository } from '../../domain/historicoTransacao/repositories/ihistorico-transacao.repository';
import { HistoricoTransacaoRepository } from './historico-transacao.repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: IContaRepository,
      useClass: ContaRepository,
    },
    {
      provide: ITransacaoRepository,
      useClass: TransacaoRepository,
    },
    {
      provide: IHistoricoTransacaoRepository,
      useClass: HistoricoTransacaoRepository,
    },
  ],
  exports: [
    IContaRepository,
    ITransacaoRepository,
    IHistoricoTransacaoRepository,
  ],
})
export class RepositoriesModule {}
