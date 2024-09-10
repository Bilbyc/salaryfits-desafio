import { Module } from '@nestjs/common';
import { ServicesModule } from './app/services/services.module';
import { ControllersModule } from './app/infrastructure/controllers/controllers.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ServicesModule,
    ControllersModule,
    ThrottlerModule.forRoot([
      {
        ttl: 70,
        limit: 5,
      },
    ]),
  ],
  providers: [],
})
export class AppModule {}
