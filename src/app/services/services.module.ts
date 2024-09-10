import { Module } from '@nestjs/common';
import { RepositoriesModule } from '../infrastructure/repositories/repositories.module';
import { ContaService } from './conta.service';
import { TransacaoService } from './transacao.service';
import { AuthService } from '../infrastructure/adapters/authentication/service/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../infrastructure/adapters/authentication/constants';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../infrastructure/adapters/authentication/auth.guard';

@Module({
  imports: [
    RepositoriesModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '360s' },
    }),
  ],
  providers: [
    ContaService,
    TransacaoService,
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [ContaService, TransacaoService, AuthService],
})
export class ServicesModule {}
