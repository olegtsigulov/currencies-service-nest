import { Column } from 'typeorm';
import { IsDefined } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CurrencyType {
    @ApiProperty({
      description: 'usd currency for hive or hive dollar',
      example: 0.5412,
    })
    @Column()
    @IsDefined()
    usd: number;

    @ApiProperty({
      description: 'usd 24h change for hive or hive dollar',
      example: 2.34534,
    })
    @Column()
    @IsDefined()
    usd_24h_change: number;

    @ApiProperty({
      description: 'btc currency for hive or hive dollar',
      example: 0.0005412,
    })
    @Column()
    @IsDefined()
    btc: number;

    @ApiProperty({
      description: 'btc 24h change for hive or hive dollar',
      example: 2.34534,
    })
    @Column()
    @IsDefined()
    btc_24h_change: number;

    constructor(usd: number, usd_24h_change: number, btc: number, btc_24h_change: number) {
      this.usd = usd;
      this.usd_24h_change = usd_24h_change;
      this.btc = btc;
      this.btc_24h_change = btc_24h_change;
    }
}
