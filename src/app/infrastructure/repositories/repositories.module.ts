import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { IContaRepository } from '../../domain/conta/repositories/iconta.repository';
import { ContaRepository } from './conta.repository';
import { ITransacaoRepository } from '../../domain/transacao/repositories/itransacao.repository';
import { TransacaoRepository } from './transacao.repository';

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
  ],
  exports: [IContaRepository, ITransacaoRepository],
})
export class RepositoriesModule {}
