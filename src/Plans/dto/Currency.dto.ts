import {IsEnum }from 'class-validator'
import { Currency } from './Currency.enum'

export class CurrencyDto {
    @IsEnum(Currency)
    readonly currency: Currency
}