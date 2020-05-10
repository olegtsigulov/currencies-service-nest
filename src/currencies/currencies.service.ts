import { Injectable } from '@nestjs/common';
import { CurrenciesRepository } from './currencies.repository';
import { GetMarketInfoDto } from './validations/market-info.input';
import { CurrencyRequest } from '../common/requests/currency.request';
import { CurrenciesStatisticEntity } from '../entities/currencies-service.entity';

@Injectable()
export class CurrenciesService {
  constructor(private currencyRequest: CurrencyRequest,
              private readonly currenciesRepository: CurrenciesRepository) {}

  async getMarketInfo(params: GetMarketInfoDto) {
    const result = {
      current: null,
      weekly: null,
    };
    result.current = await this.currencyRequest.getCurrenciesFromRequest(params);
    result.weekly = await this.getWeaklyCurrencies(result.current);
    return result;
  }

  async getWeaklyCurrencies(
    currentCurrency: CurrenciesStatisticEntity,
  ) :Promise<CurrenciesStatisticEntity[]> {
    const weeklyCurrencies = await this.currenciesRepository.find({
      where: { type: 'dailyData' },
      take: 7,
    });
    weeklyCurrencies[0] = currentCurrency;
    return weeklyCurrencies;
  }
}
