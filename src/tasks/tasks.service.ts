import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import * as moment from 'moment';
import { CurrenciesRepository } from 'src/currencies/currencies.repository';
import { CurrencyRequest } from 'src/common/requests/currency.request';
import { AllowedIdsEnum } from 'src/common/enums/allowed-ids.enum';
import { AllowedCurrenciesEnum } from 'src/common/enums/allower-currencies.enum';
import { AllowedResourcesEnum } from 'src/common/enums/allowed-resources.enum';
import { CurrencyTypesEnum } from 'src/common/enums/currency-types.enum';

@Injectable()
export class TasksService {
  constructor(private currencyRequest: CurrencyRequest,
              private readonly currenciesService: CurrenciesRepository) {}
  @Cron('0 */5 * * * *')
  async saveCurrency() {
    const result = await this.currencyRequest.getCurrenciesFromRequest({
      ids: [AllowedIdsEnum.hive, AllowedIdsEnum.hiveDollar],
      currencies: [AllowedCurrenciesEnum.btc, AllowedCurrenciesEnum.usd],
      resource: AllowedResourcesEnum.coingeko,
    });
    result.type = CurrencyTypesEnum.ordinary;
    const currencies = await this.currenciesService.create(result);
    if (currencies) console.log(`Currencies successfully save at ${new Date()}`);
  }

  @Cron('0 0 0 */1 * *')
  async saveDailyCurrency() {
    const startOfDay = moment().startOf('day').toDate();
    const endOfDay = moment().endOf('day').toDate();
    const [result] = await this.currenciesService.aggregate([{
      $match: {
        $and: [{ createdAt: { $gt: startOfDay } }, { createdAt: { $lt: endOfDay } }],
        type: 'ordinaryData',
      },
    }, {
      $group: {
        _id: null,
        hive_dollar_usd: { $avg: '$hive_dollar.usd' },
        hive_dollar_usd_24h: { $avg: '$hive_dollar.usd_24h_change' },
        hive_dollar_btc: { $avg: '$hive_dollar.btc' },
        hive_dollar_btc_24h: { $avg: '$hive_dollar.btc_24h_change' },
        hive_usd: { $avg: '$hive.usd' },
        hive_usd_24h_change: { $avg: '$hive.usd_24h_change' },
        hive_btc: { $avg: '$hive.btc' },
        hive_btc_24h_change: { $avg: '$hive.btc_24h_change' },
      },
    }, {
      $project: {
        _id: 0,
        type: 'dailyData',
        'hive_dollar.usd': '$hive_dollar_usd',
        'hive_dollar.usd_24h_change': '$hive_dollar_usd_24h',
        'hive_dollar.btc': '$hive_dollar_btc',
        'hive_dollar.btc_24h_change': '$hive_dollar_btc_24h',
        'hive.usd': '$hive_dollar_usd',
        'hive.usd_24h_change': '$hive_dollar_usd_24h',
        'hive.btc': '$hive_dollar_btc',
        'hive.btc_24h_change': '$hive_dollar_btc_24h',
      },
    },
    ]);
    const currencies = await this.currenciesService.create(result);
    if (currencies) console.log(`Daily currencies successfully save at ${new Date()}`);
  }
}
