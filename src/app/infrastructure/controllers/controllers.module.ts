import { ServicesModule } from '../../services/services.module';
import { Module } from '@nestjs/common';
import { ContaController } from './conta/conta.controller';
import { TransacaoController } from './transacao/transacao.controller';
import { AuthController } from '../adapters/authentication/controller/auth.controller';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '../adapters/authorization/roles.guard';
import { ThrottlerGuard } from "@nestjs/throttler";

@Module({
  imports: [ServicesModule],
  controllers: [ContaController, TransacaoController, AuthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class ControllersModule {}
