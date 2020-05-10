import {
  ArrayNotEmpty, ArrayUnique, IsDefined,
} from 'class-validator';
import { AllowedIdsEnum } from '../../enums/allowed-ids.enum';
import { AllowedCurrenciesEnum } from '../../enums/allower-currencies.enum';


export class CurrencyRequestDataDto {
    @IsDefined()
   readonly resource: string

    @ArrayNotEmpty()
    @ArrayUnique()
    readonly ids: AllowedIdsEnum[]

    @ArrayNotEmpty()
    @ArrayUnique()
    readonly currencies: AllowedCurrenciesEnum[]
}
