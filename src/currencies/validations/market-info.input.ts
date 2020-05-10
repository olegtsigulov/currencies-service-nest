import * as Joi from '@hapi/joi';
import { ApiProperty } from '@nestjs/swagger';
import { AllowedResourcesEnum } from 'src/common/enums/allowed-resources.enum';
import { AllowedIdsEnum } from 'src/common/enums/allowed-ids.enum';
import { AllowedCurrenciesEnum } from 'src/common/enums/allower-currencies.enum';

export const getMarketInfoSchema = Joi.object().keys({
  resource: Joi.string().valid(AllowedResourcesEnum.coingeko),
  ids: Joi
    .when('resource', {
      is: AllowedResourcesEnum.coingeko,
      then: Joi.array().items(
        Joi.string().valid(AllowedIdsEnum.hiveDollar, AllowedIdsEnum.hive),
      ).single(),
    }).required(),
  currencies: Joi
    .when('resource', {
      is: AllowedResourcesEnum.coingeko,
      then: Joi.array().items(
        Joi.string().valid(AllowedCurrenciesEnum.usd, AllowedCurrenciesEnum.btc),
      ).single(),
    }).required(),
});

export class GetMarketInfoDto {
    @ApiProperty(
      {
        description: 'Resource from which you want to get data',
        default: AllowedResourcesEnum.coingeko,
        enum: AllowedResourcesEnum,
      },
    )
    readonly resource: AllowedResourcesEnum;

    @ApiProperty({
      description: 'Ids for currencies',
      enum: AllowedIdsEnum,
      isArray: true,
      type: [String],
    })
    readonly ids: AllowedIdsEnum[]

    @ApiProperty({
      description: ' currencies for needed ids to show',
      enum: AllowedCurrenciesEnum,
      isArray: true,
      type: [String],
    })
    readonly currencies: AllowedCurrenciesEnum[]
}
