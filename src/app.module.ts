import { Module } from '@nestjs/common';
import { ServicesModule } from './app/services/services.module';
import { ControllersModule } from './app/infrastructure/controllers/controllers.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ServicesModule,
    ControllersModule,
    ThrottlerModule.forRoot([
      {
        ttl: 60,
        limit: 5,
      },
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [],
})
export class AppModule {}
