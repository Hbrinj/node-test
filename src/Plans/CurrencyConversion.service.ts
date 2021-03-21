import { Injectable } from "@nestjs/common";
import axios from "axios";


@Injectable()
export class CurrencyConversionService {
    private readonly base: string = "GBP"
    private readonly url: string = `https://api.exchangeratesapi.io/latest?base=${this.base}&symbols=`

    //TODO: this is a bit nieve, need to make sure we're not doing anything janky
    async getConversionRateFor(currency: string): Promise<number> {
        try {
            let response = await (await axios.get(`${this.url}${currency}`)).data
            return response['rates'][currency]
        } catch (errors) {
            console.log(errors)
        }

        return 
    }
}