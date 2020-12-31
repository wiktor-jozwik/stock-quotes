import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyEntity } from 'src/companies/company.entity';
import { Repository } from 'typeorm';
import { QuoteDTO, QuoteRO } from './quote.dto';
import { QuoteEntity } from './quote.entity';

@Injectable()
export class QuotesService {
  constructor(
    @InjectRepository(QuoteEntity)
    private quoteRepository: Repository<QuoteEntity>,
    @InjectRepository(CompanyEntity)
    private companyRepository: Repository<CompanyEntity>,
  ) {}

  async showAll(): Promise<QuoteRO[]> {
    const quotes = await this.quoteRepository.find({ relations: ['company'] });
    return quotes.map((quote) => quote.toResponseQuote());
  }

  async show(id: string): Promise<QuoteRO> {
    const quote = await this.quoteRepository.findOne({
      where: { id },
      relations: ['company'],
    });
    if (!quote) {
      throw new HttpException('Quote not found', HttpStatus.NOT_FOUND);
    } else {
      return quote.toResponseQuote();
    }
  }

  async create(data: QuoteDTO): Promise<QuoteDTO> {
    const company = await this.companyRepository.findOne({
      where: { id: data.companyId },
    });
    if (!company) {
      throw new HttpException('Company not found', HttpStatus.NOT_FOUND);
    }
    const quote = await this.quoteRepository.create({ ...data, company });
    await this.quoteRepository.save(quote);
    return quote;
  }

  async delete(id: string): Promise<QuoteDTO> {
    const quote = await this.quoteRepository.findOne({ where: { id } });
    if (!quote) {
      throw new HttpException('Quote not found', HttpStatus.NOT_FOUND);
    } else {
      await this.quoteRepository.delete({ id });
      return quote;
    }
  }
}
