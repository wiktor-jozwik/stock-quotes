import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuoteEntity } from 'src/quotes/quote.entity';
import { Repository } from 'typeorm';
import { CompanyDTO, CompanyRO } from './company.dto';
import { CompanyEntity } from './company.entity';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(CompanyEntity)
    private companyRepository: Repository<CompanyEntity>,
  ) {}

  private toResponseCompany(company: CompanyEntity): CompanyRO {
    const { id, name, symbol } = company;
    const quotes = company.quotes.map((quote) => quote.toResponseQuote());
    const toResponseObject = { id, name, symbol, quotes: quotes };
    return toResponseObject;
  }

  async showAll(): Promise<CompanyRO[]> {
    const companies = await this.companyRepository.find({
      relations: ['quotes'],
    });
    console.log(companies);
    return companies.map((company) => this.toResponseCompany(company));
  }

  async show(symbol: string): Promise<CompanyRO> {
    const company = await this.companyRepository.findOne({
      where: { symbol: symbol },
      relations: ['quotes'],
    });
    if (!company) {
      throw new HttpException('Company not found', HttpStatus.NOT_FOUND);
    }
    return this.toResponseCompany(company);
  }

  async create(data: CompanyDTO): Promise<CompanyRO> {
    const { symbol } = data;
    let company = await this.companyRepository.findOne({
      where: { symbol },
    });
    if (company) {
      throw new HttpException('Company already exists', HttpStatus.BAD_REQUEST);
    }
    company = await this.companyRepository.create(data);
    await this.companyRepository.save(company);
    return this.toResponseCompany(company);
  }

  async update(id: string, data: Partial<CompanyDTO>): Promise<CompanyRO> {
    let company = await this.companyRepository.findOne({ where: { id } });
    if (!company) {
      throw new HttpException('Company not found', HttpStatus.NOT_FOUND);
    }
    await this.companyRepository.update({ id }, data);
    company = await this.companyRepository.findOne({
      where: { id },
      relations: ['quotes'],
    });
    return company;
  }
}
