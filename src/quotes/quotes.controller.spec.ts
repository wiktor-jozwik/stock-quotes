import { Test, TestingModule } from '@nestjs/testing';
import { QuoteDTO, QuoteRO } from './quote.dto';
import { QuotesController } from './quotes.controller';
import { QuotesService } from './quotes.service';

const dateTest = '14.01.2020';
const valueTest = 15.5;
const companyTest = {
  id: 'a company uuid',
  symbol: 'AMZN',
  name: 'Amazon',
};

describe('QuotesController', () => {
  let quotesController: QuotesController;
  let quotesService: QuotesService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: QuotesService,
          useValue: {
            showAll: jest.fn().mockResolvedValue([
              {
                id: 'quote1 uuid',
                date: dateTest,
                value: 14.25,
                company: companyTest,
              },
              {
                id: 'quote2 uuid',
                date: '15.01.2020',
                value: 14.66,
                company: companyTest,
              },
              {
                id: 'quote3 uuid',
                date: '16.01.2020',
                value: 16.88,
                company: companyTest,
              },
            ]),
            show: jest.fn().mockImplementation((id: string) =>
              Promise.resolve({
                id,
                date: dateTest,
                value: valueTest,
                company: companyTest,
              }),
            ),
            create: jest
              .fn()
              .mockImplementation((data: QuoteDTO) =>
                Promise.resolve({ ...data, company: companyTest }),
              ),
            delete: jest.fn().mockImplementation((symbol: string) =>
              Promise.resolve({
                id: 'deleted uuid',
                date: dateTest,
                value: valueTest,
                company: companyTest,
              }),
            ),
          },
        },
      ],
      controllers: [QuotesController],
    }).compile();

    quotesService = moduleRef.get<QuotesService>(QuotesService);
    quotesController = moduleRef.get<QuotesController>(QuotesController);
  });

  describe('showAllQuotes', () => {
    it('should get an array of quotes', async () => {
      await expect(quotesController.showAllQuotes()).resolves.toEqual([
        {
          id: 'quote1 uuid',
          date: dateTest,
          value: 14.25,
          company: companyTest,
        },
        {
          id: 'quote2 uuid',
          date: '15.01.2020',
          value: 14.66,
          company: companyTest,
        },
        {
          id: 'quote3 uuid',
          date: '16.01.2020',
          value: 16.88,
          company: companyTest,
        },
      ]);
    });
  });

  describe('readSingleQuote', () => {
    it('should get a quote', async () => {
      const id = 'Quote uuid';
      await expect(quotesController.readSingleQuote(id)).resolves.toEqual({
        id,
        date: dateTest,
        value: valueTest,
        company: companyTest,
      });
    });
  });

  describe('createQuote', () => {
    it('should create a quote', async () => {
      const newQuote: QuoteDTO = {
        symbol: 'AAPL',
        date: dateTest,
        value: valueTest,
      };
      await expect(quotesController.createQuote(newQuote)).resolves.toEqual({
        ...newQuote,
        company: companyTest,
      });
    });
  });

  describe('deleteQuote', () => {
    it('should delete a quote', async () => {
      const newQuote: QuoteRO = {
        id: 'deleted uuid',
        date: dateTest,
        value: valueTest,
        company: companyTest,
      };
      await expect(quotesController.deleteQuote(newQuote.id)).resolves.toEqual(
        newQuote,
      );
    });
  });
});
