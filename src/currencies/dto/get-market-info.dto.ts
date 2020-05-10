import { IsDefined } from 'class-validator';
import { CurrenciesStatisticEntity } from 'src/entities/currencies-service.entity';
import { ApiProperty } from '@nestjs/swagger';


export class GetMarketInfoResultDto {
    @IsDefined()
    @ApiProperty({
      description: 'Current currency',
      type: () => CurrenciesStatisticEntity,
    })
    current: CurrenciesStatisticEntity

    @ApiProperty({
      description: 'Weekly currency',
      type: () => [CurrenciesStatisticEntity],
    })
    @IsDefined()
    weekly: [CurrenciesStatisticEntity]
}
