import { Module } from '@nestjs/common';
import { AppController } from './app/infrastructure/controllers/app.controller';
import { AppService } from './app/services/app.service';
import { ContaController } from './app/infrastructure/controllers/conta/conta.controller';

@Module({
  imports: [],
  controllers: [AppController, ContaController],
  providers: [AppService],
})
export class AppModule {}
