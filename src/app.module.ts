import { Module } from '@nestjs/common';
import { AppController } from './app/infrastructure/controllers/app.controller';
import { AppService } from './app/services/app.service';
import { ContaController } from './app/infrastructure/controllers/conta/conta.controller';
import { ServicesModule } from './app/services/services.module';
import { TransacaoController } from './app/infrastructure/controllers/transacao/transacao.controller';
import { AuthController } from './app/infrastructure/adapters/authentication/controller/auth.controller';
import { ControllersModule } from './app/infrastructure/controllers/controllers.module';

@Module({
  imports: [ServicesModule, ControllersModule],
  providers: [AppService],
})
export class AppModule {}
