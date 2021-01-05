import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyEntity } from '../companies/company.entity';
import { Connection, Repository } from 'typeorm';
import { QuoteDTO, QuoteRO } from './quote.dto';
import { QuoteEntity } from './quote.entity';
import { CompaniesService } from 'src/companies/companies.service';

@Injectable()
export class QuotesService {
  constructor(
    @InjectRepository(QuoteEntity)
    private quoteRepository: Repository<QuoteEntity>,
    @InjectRepository(CompanyEntity)
    private companyRepository: Repository<CompanyEntity>,
    private companiesService: CompaniesService,
    private connection: Connection,
  ) {}

  async showAll(): Promise<QuoteRO[]> {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction('READ COMMITTED');

    const quotes = await this.quoteRepository.find({ relations: ['company'] });
    if (!quotes) {
      throw new HttpException('Quote not found', HttpStatus.NOT_FOUND);
    }
    try {
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException();
    } finally {
      await queryRunner.release();
    }
    return quotes.map((quote) => quote.toResponseQuote());
  }

  async show(id: string): Promise<QuoteRO> {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction('READ COMMITTED');

    const quote = await this.quoteRepository.findOne({
      where: { id },
      relations: ['company'],
    });
    if (!quote) {
      throw new HttpException('Quote not found', HttpStatus.NOT_FOUND);
    }
    try {
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException();
    } finally {
      await queryRunner.release();
    }
    return quote.toResponseQuote();
  }

  async create(data: QuoteDTO): Promise<QuoteDTO> {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction('READ COMMITTED');

    let company = await this.companyRepository.findOne({
      where: { symbol: data.symbol },
    });
    if (!company) {
      const { symbol } = data;
      // throw new HttpException('Company not found', HttpStatus.NOT_FOUND);
      this.companiesService.create({ symbol });
    }
    company = await this.companyRepository.findOne({
      where: { symbol: data.symbol },
    });
    const quote = { ...data, company };
    try {
      await this.quoteRepository.save(quote);
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException();
    } finally {
      await queryRunner.release();
    }
    return quote;
  }

  async delete(id: string): Promise<QuoteDTO> {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction('SERIALIZABLE');
    const quote = await this.quoteRepository.findOne({ where: { id } });
    if (!quote) {
      throw new HttpException('Quote not found', HttpStatus.NOT_FOUND);
    }
    try {
      await this.quoteRepository.delete({ id });
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException();
    } finally {
      await queryRunner.release();
    }
    return quote;
  }
}
