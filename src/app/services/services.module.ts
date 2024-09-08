import { Module } from '@nestjs/common';
import { RepositoriesModule } from '../infrastructure/repositories/repositories.module';
import { ContaService } from './conta.service';

@Module({
  imports: [RepositoriesModule],
  providers: [ContaService],
  exports: [ContaService],
})
export class ServicesModule {}
