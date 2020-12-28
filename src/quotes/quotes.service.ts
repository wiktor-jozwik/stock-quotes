import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuoteDTO } from './quote.dto';
import { QuoteEntity } from './quote.entity';

@Injectable()
export class QuotesService {
  constructor(
    @InjectRepository(QuoteEntity)
    private quoteRepository: Repository<QuoteEntity>,
  ) {}

  async showAll(): Promise<QuoteDTO[]> {
    const quotes = await this.quoteRepository.find();
    return quotes;
  }

  async readOne(id: string): Promise<QuoteDTO> {
    const quote = await this.quoteRepository.findOne({ where: { id } });
    return quote;
  }

  async readOneCompany(companyName: string): Promise<QuoteDTO[]> {
    const quotes = await this.quoteRepository.find({
      where: { name: companyName },
    });
    return quotes;
  }

  async create(data: QuoteDTO): Promise<QuoteDTO> {
    const quote = await this.quoteRepository.create({ ...data });
    await this.quoteRepository.save(quote);
    return quote;
  }

  async delete(id: string): Promise<QuoteDTO> {
    const quote = await this.quoteRepository.findOne({ where: { id } });
    await this.quoteRepository.delete({ id });
    return quote;
  }
}
