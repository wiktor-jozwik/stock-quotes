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

  async showAll(): Promise<CompanyRO[]> {
    const companies = await this.companyRepository.find({
      relations: ['quotes'],
    });
    return companies.map((company) => company.toResponseCompany());
  }

  async show(symbol: string): Promise<CompanyRO> {
    const company = await this.companyRepository.findOne({
      where: { symbol: symbol },
      relations: ['quotes'],
    });
    if (!company) {
      throw new HttpException('Company not found', HttpStatus.NOT_FOUND);
    }
    return company.toResponseCompany();
  }

  async create(data: CompanyDTO): Promise<CompanyRO> {
    const { symbol } = data;
    let company = await this.companyRepository.findOne({
      where: { symbol },
    });
    if (company) {
      throw new HttpException('Company already exists', HttpStatus.BAD_REQUEST);
    }
    company = this.companyRepository.create(data);
    await this.companyRepository.save(company);
    return company.toResponseCompany();
  }

  async update(symbol: string, data: Partial<CompanyDTO>): Promise<CompanyRO> {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction('SERIALIZABLE');
    let company = await this.companyRepository.findOne({ where: { symbol } });
    if (!company) {
      throw new HttpException('Company not found', HttpStatus.NOT_FOUND);
    }
    try {
      await this.companyRepository.update({ symbol }, data);
      company = await this.companyRepository.findOne({
        where: { symbol },
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

  async delete(symbol: string): Promise<CompanyRO> {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction('SERIALIZABLE');

    let company = await this.companyRepository.findOne({
      where: { symbol },
      relations: ['quotes'],
    });
    if (!company) {
      throw new HttpException('Company not found', HttpStatus.NOT_FOUND);
    }
    try {
      await this.companyRepository.delete({ symbol });
      queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException();
    } finally {
      await queryRunner.release();
    }
    return company.toResponseCompany();
  }
}
