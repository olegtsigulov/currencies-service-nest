import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CurrenciesRepository } from './currencies.repository';
import { CurrenciesController } from './currencies.controller';
import { CurrenciesStatisticEntity } from '../entities/currencies-service.entity';
import { CurrenciesService } from './currencies.service';
import { CurrencyRequest } from '../common/requests/currency.request';
import { HttpConfigService } from '../common/requests/http-config.service';

@Module({
  imports: [HttpModule.registerAsync({
    useClass: HttpConfigService,
  }),
  TypeOrmModule.forFeature([CurrenciesStatisticEntity])],
  providers: [CurrenciesRepository, CurrenciesService, CurrencyRequest],
  controllers: [CurrenciesController],
})
export class CurrenciesModule {}
