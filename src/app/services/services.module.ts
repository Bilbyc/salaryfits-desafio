import { Module } from '@nestjs/common';
import { RepositoriesModule } from '../infrastructure/repositories/repositories.module';
import { ContaService } from './conta.service';
import { TransacaoService } from './transacao.service';
import { AuthService } from '../infrastructure/adapters/auth/service/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../infrastructure/adapters/auth/constants';

@Module({
  imports: [
    RepositoriesModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '180s' },
    }),
  ],
  providers: [ContaService, TransacaoService, AuthService],
  exports: [ContaService, TransacaoService, AuthService],
})
export class ServicesModule {}
