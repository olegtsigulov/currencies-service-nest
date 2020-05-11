import {
  HttpModule, MiddlewareConsumer, Module, NestModule, RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CurrenciesStatisticEntity } from 'src/entities/currencies-service.entity';
import { CurrencyRequest } from 'src/common/requests/currency.request';
import { HttpConfigService } from 'src/common/requests/http-config.service';
import { PreValidationMiddleware } from 'src/common/middlewares/preValidation.middleware';
import { CurrenciesService } from './currencies.service';
import { CurrenciesController } from './currencies.controller';
import { CurrenciesRepository } from './currencies.repository';

@Module({
  imports: [HttpModule.registerAsync({
    useClass: HttpConfigService,
  }),
  TypeOrmModule.forFeature([CurrenciesStatisticEntity])],
  controllers: [CurrenciesController],
  providers: [CurrenciesRepository, CurrenciesService, CurrencyRequest],
})
export class CurrenciesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(PreValidationMiddleware)
      .forRoutes({ path: '/*', method: RequestMethod.GET });
  }
}
