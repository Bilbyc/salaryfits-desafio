import { Module } from '@nestjs/common';
import { RepositoriesModule } from '../infrastructure/repositories/repositories.module';
import { ContaService } from './conta.service';
import { TransacaoService } from './transacao.service';
import { AuthService } from '../infrastructure/adapters/auth/service/auth.service';

@Module({
  imports: [RepositoriesModule],
  providers: [ContaService, TransacaoService, AuthService],
  exports: [ContaService, TransacaoService, AuthService],
})
export class ServicesModule {}
