import { Module } from '@nestjs/common';
import { AppController } from './app/infrastructure/controllers/app.controller';
import { AppService } from './app/services/app.service';
import { ContaController } from './app/infrastructure/controllers/conta/conta.controller';
import { PrismaService } from './app/infrastructure/prisma/prisma.service';

@Module({
  imports: [],
  controllers: [AppController, ContaController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
