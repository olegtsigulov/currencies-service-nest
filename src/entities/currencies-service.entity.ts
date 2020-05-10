import {
  Column, CreateDateColumn, Entity, ObjectID, ObjectIdColumn, UpdateDateColumn,
} from 'typeorm';
import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CurrencyTypesEnum } from 'src/common/enums/currency-types.enum';
import { Index } from 'typeorm/decorator/Index';

import { CurrencyType } from './types/currency.type';
import { AbstractEntity } from './abstract-entity';

@Entity('currencies-statistic')
export class CurrenciesStatisticEntity extends AbstractEntity {
    @ObjectIdColumn()
    id: ObjectID;

    @ApiProperty({
      description: 'type of market data',
      enum: CurrencyTypesEnum,
    })
    @Column()
    @IsEnum(CurrencyTypesEnum)
    type: string

    @ApiProperty({
      description: 'hive dollar currency',
      type: () => CurrencyType,
    })
    @Column(() => CurrencyType)
    hive_dollar: CurrencyType

    @ApiProperty({
      description: 'hive currency',
      type: () => CurrencyType,
    })
    @Column(() => CurrencyType)
    hive: CurrencyType

    @ApiProperty({
      description: 'time when data create',
      example: 'Sun May 10 2020 15:50:00 GMT+0300 (GMT+03:00)',
    })
    @Index()
    @CreateDateColumn()
    createdAt: Date

    @ApiProperty({
      description: 'time when data create',
      example: 'Sun May 10 2020 15:50:00 GMT+0300 (GMT+03:00)',
    })
    @UpdateDateColumn()
    updatedAt: Date
}
