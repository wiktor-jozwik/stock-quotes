import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';
import { CompanyDTO } from './company.dto';

const nameTest = 'Name Test';
const quoteTest = {
  id: 'a uuid',
  date: '14.01.2021',
  value: 155.54,
};

describe('CompaniesController', () => {
  let companiesController: CompaniesController;
  let companiesService: CompaniesService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CompaniesService,
          useValue: {
            showAll: jest.fn().mockResolvedValue([
              {
                symbol: 'AAPL',
                name: 'Apple',
                quotes: [quoteTest],
              },
              { symbol: 'CDR', name: 'CDRProjekt' },
              { symbol: 'AMZN', name: 'Amazon' },
            ]),
            show: jest.fn().mockImplementation((symbol: string) =>
              Promise.resolve({
                symbol,
                name: nameTest,
                quotes: [quoteTest],
              }),
            ),
            create: jest
              .fn()
              .mockImplementation((company: CompanyDTO) =>
                Promise.resolve({ id: 'a uuid', ...company }),
              ),
            update: jest
              .fn()
              .mockImplementation((symbol: string, data: Partial<CompanyDTO>) =>
                Promise.resolve({ id: 'a uuid', ...data }),
              ),
            delete: jest.fn().mockImplementation((symbol: string) =>
              Promise.resolve({
                symbol,
                name: nameTest,
                quotes: [quoteTest],
              }),
            ),
          },
        },
      ],
      controllers: [CompaniesController],
    }).compile();

    companiesService = moduleRef.get<CompaniesService>(CompaniesService);
    companiesController = moduleRef.get<CompaniesController>(
      CompaniesController,
    );
  });

  describe('showAllCompanies', () => {
    it('should get an array of companies', async () => {
      await expect(companiesController.showAllCompanies()).resolves.toEqual([
        {
          symbol: 'AAPL',
          name: 'Apple',
          quotes: [quoteTest],
        },
        { symbol: 'CDR', name: 'CDRProjekt' },
        { symbol: 'AMZN', name: 'Amazon' },
      ]);
    });
  });

  describe('showOne', () => {
    it('should get a company', async () => {
      const symbol = 'AAPL';
      await expect(companiesController.showOne(symbol)).resolves.toEqual({
        name: nameTest,
        symbol: symbol,
        quotes: [quoteTest],
      });
    });
  });

  describe('createCompany', () => {
    it('should create a company', async () => {
      const newCompany: CompanyDTO = {
        name: 'Apple',
        symbol: 'AAPL',
      };
      await expect(
        companiesController.createCompany(newCompany),
      ).resolves.toEqual({
        id: 'a uuid',
        ...newCompany,
      });
    });
  });

  describe('updateCompany', () => {
    it('should update a company', async () => {
      const postSymbol = 'AAPL';
      const newCompany: Partial<CompanyDTO> = {
        name: 'App',
        symbol: 'AAP',
      };
      await expect(
        companiesController.updateCompany(postSymbol, newCompany),
      ).resolves.toEqual({
        id: 'a uuid',
        ...newCompany,
      });
    });
  });

  describe('deleteCompany', () => {
    it('should delete a company', async () => {
      const symbol = 'AAPL';
      await expect(companiesController.deleteCompany(symbol)).resolves.toEqual({
        name: nameTest,
        symbol: symbol,
        quotes: [quoteTest],
      });
    });
  });
});
