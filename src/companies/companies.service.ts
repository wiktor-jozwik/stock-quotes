import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CompanyDTO, CompanyRO } from './company.dto';
import { CompanyEntity } from './company.entity';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(CompanyEntity)
    private companyRepository: Repository<CompanyEntity>,
    private connection: Connection,
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
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction('SERIALIZABLE');
    let company = await this.companyRepository.findOne({ where: { id } });
    if (!company) {
      throw new HttpException('Company not found', HttpStatus.NOT_FOUND);
    }
    try {
      await this.companyRepository.update({ id }, data);
      company = await this.companyRepository.findOne({
        where: { id },
        relations: ['quotes'],
      });
      queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException();
    } finally {
      await queryRunner.release();
    }
    return company;
  }
}
