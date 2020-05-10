import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './tasks.service';
import { CurrenciesRepository } from '../currencies/currencies.repository';
import { CurrenciesStatisticEntity } from '../entities/currencies-service.entity';
import { HttpConfigService } from '../common/requests/http-config.service';
import { CurrencyRequest } from '../common/requests/currency.request';

@Module({
  imports: [HttpModule.registerAsync({
    useClass: HttpConfigService,
  }),
  TypeOrmModule.forFeature([CurrenciesStatisticEntity]),
  ],
  providers: [TasksService, CurrenciesRepository, CurrencyRequest],
})
export class TasksModule {}
