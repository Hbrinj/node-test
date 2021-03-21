import { CurrencyConversionService } from "./CurrencyConversion.service";
import { rest } from "msw"
import { setupServer } from "msw/node"

const server = setupServer(
    rest.get("https://api.exchangeratesapi.io/latest", (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({rates: {EUR: 1.22}}))
    })
);

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

describe('CurrencyConversionService', () => {
    let currencyConversionService: CurrencyConversionService;

    beforeEach( async() => {
       currencyConversionService = new CurrencyConversionService()
    });

    it('retrieves the conversation ', async () => {
        // Given

        // When
        let result = await currencyConversionService.getConversionRateFor("EUR")

        // Then
        expect(result).toBe(1.22);
    });

    it('throws an error when upstream fails', async () => {
        //Given
        server.use( 
            rest.get("https://api.exchangeratesapi.io/latest", (req, res, ctx) => {
                return res(ctx.status(500))
            })
        );
        // When
        let result = async () => { await currencyConversionService.getConversionRateFor("GBP") }

        // Then
        expect(result).rejects.toThrow("Unable to retrieve conversion rate")
    });

    it('Throws an error when upstream response doesnt contain the currency data', async() => {
        //Given
        server.use( 
            rest.get("https://api.exchangeratesapi.io/latest", (req, res, ctx) => {
                return res(ctx.status(200), ctx.json({rates: {EUR: 1.22}}))
            })
        );
        // When
        let result = async () => { await currencyConversionService.getConversionRateFor("GBP") }

        // Then
        expect(result).rejects.toThrow("conversion data was undefined")
    });
});