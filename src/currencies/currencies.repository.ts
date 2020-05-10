import { Injectable } from '@nestjs/common';
import { MongoRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CurrenciesStatisticEntity } from '../entities/currencies-service.entity';

@Injectable()
export class CurrenciesRepository {
  constructor(
        @InjectRepository(CurrenciesStatisticEntity) private currenciesRepository:
            MongoRepository<CurrenciesStatisticEntity>,
  ) {}

  async create(params: CurrenciesStatisticEntity) : Promise<boolean> {
    const result = await this.currenciesRepository.create(params);
    console.log(result);
    try {
      await result.save();
      return !!result;
    } catch (e) {
      return false;
    }
  }

  async aggregate(pipeline: Array<any>) : Promise<any> {
    return this.currenciesRepository.aggregate(pipeline).toArray();
  }
  async find(condition: Record<string, any>) : Promise<any> {
    return this.currenciesRepository.find(condition);
  }
}
