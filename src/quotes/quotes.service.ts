import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyEntity } from 'src/companies/company.entity';
import { Connection, Repository } from 'typeorm';
import { QuoteDTO, QuoteRO } from './quote.dto';
import { QuoteEntity } from './quote.entity';

@Injectable()
export class QuotesService {
  constructor(
    @InjectRepository(QuoteEntity)
    private quoteRepository: Repository<QuoteEntity>,
    @InjectRepository(CompanyEntity)
    private companyRepository: Repository<CompanyEntity>,
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

    const company = await this.companyRepository.findOne({
      where: { id: data.companyId },
    });
    if (!company) {
      throw new HttpException('Company not found', HttpStatus.NOT_FOUND);
    }
    const quote = { ...data, company };
    try {
      this.quoteRepository.create({ ...data, company });
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
