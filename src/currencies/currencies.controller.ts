import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CurrenciesService } from './currencies.service';
import { JoiValidationPipe } from '../common/pipes/validation.pipe';
import { GetMarketInfoDto, getMarketInfoSchema } from './validations/market-info.input';
import { GetMarketInfoResultDto } from './dto/get-market-info.dto';

@ApiTags('currencies')
@Controller('')
export class CurrenciesController {
  constructor(private currenciesService: CurrenciesService) {}

  @Get('marketInfo')
  @ApiOperation({ summary: 'Return Market currencies info' })
  @ApiResponse({
    status: 200,
    description: 'Market currencies info',
    type: GetMarketInfoResultDto,
  })
  async getMarketInfo(@Query(new JoiValidationPipe(getMarketInfoSchema)) params: GetMarketInfoDto) {
    return this.currenciesService.getMarketInfo(params);
  }
}
