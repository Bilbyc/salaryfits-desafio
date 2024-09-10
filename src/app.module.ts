import { Module } from '@nestjs/common';
import { AppService } from './app/services/app.service';
import { ServicesModule } from './app/services/services.module';
import { ControllersModule } from './app/infrastructure/controllers/controllers.module';
import { ThrottlerModule } from '@nestjs/throttler';

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
  ],
  providers: [AppService],
})
export class AppModule {}
