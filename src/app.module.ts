import { Module } from '@nestjs/common';
import { AppController } from './app/infrastructure/controllers/app.controller';
import { AppService } from './app/services/app.service';
import { ContaController } from './app/infrastructure/controllers/conta/conta.controller';
import { ServicesModule } from './app/services/services.module';
import { TransacaoController } from './app/infrastructure/controllers/transacao/transacao.controller';
import { AuthController } from './app/infrastructure/adapters/auth/controller/auth.controller';

@Module({
  imports: [ServicesModule],
  controllers: [
    AppController,
    ContaController,
    TransacaoController,
    AuthController,
  ],
  providers: [AppService],
})
export class AppModule {}
