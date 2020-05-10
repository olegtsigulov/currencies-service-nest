import { HttpService, Injectable } from '@nestjs/common';
import { CurrencyRequestDataDto } from './dto/currency-request-data.dto';
import { CurrenciesStatisticEntity } from '../../entities/currencies-service.entity';
import { AllowedResourcesEnum } from '../enums/allowed-resources.enum';


@Injectable()
export class CurrencyRequest {
  constructor(private httpService: HttpService) {}

  private getUrlFromRequestData(data:CurrencyRequestDataDto):string {
    switch (data.resource) {
      case AllowedResourcesEnum.coingeko:
        return `https://api.coingecko.com/api/v3/simple/price?ids=${data.ids.toString()}&vs_currencies=${data.currencies.toString()}&include_24hr_change=true`;
      default:
        return '';
    }
  }

  async getCurrenciesFromRequest(
    data:CurrencyRequestDataDto,
  ): Promise<CurrenciesStatisticEntity> {
    const url = this.getUrlFromRequestData(data);
    const response = await this.httpService.get(url).toPromise();
    return response.data;
  }
}
