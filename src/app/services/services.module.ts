import { Module } from '@nestjs/common';
import { RepositoriesModule } from '../infrastructure/repositories/repositories.module';
import { ContaService } from './conta.service';
import { TransacaoService } from './transacao.service';

@Module({
  imports: [RepositoriesModule],
  providers: [ContaService, TransacaoService],
  exports: [ContaService, TransacaoService],
})
export class ServicesModule {}
