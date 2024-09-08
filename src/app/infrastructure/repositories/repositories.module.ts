import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { IContaRepository } from '../../domain/conta/repositories/iconta.repository';
import { ContaRepository } from './conta.repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: IContaRepository,
      useClass: ContaRepository,
    },
  ],
  exports: [IContaRepository],
})
export class RepositoriesModule {}
