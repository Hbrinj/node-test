import { Injectable } from "@nestjs/common";
import axios from "axios";


@Injectable()
export class CurrencyConversionService {
    private readonly base: string = "GBP"
    private readonly url: string = `https://api.exchangeratesapi.io/latest?base=${this.base}&symbols=`

    async getConversionRateFor(currency: string): Promise<number> {
        let rate = null
        try {
            let response = await axios.get(`${this.url}${currency}`)
            rate = response.data['rates'][currency]
        } catch (errors) {
            throw new Error("Unable to retrieve conversion rate")
        }

        if( !rate ) {
            throw new Error("conversion data was undefined")
        }
        return rate
    }
}