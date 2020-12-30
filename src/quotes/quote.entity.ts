import { CompanyEntity } from 'src/companies/company.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { QuoteRO } from './quote.dto';

@Entity('quote')
export class QuoteEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column('uuid') companyId: string;

  @Column('text') date: string;

  @Column('decimal') value: number;

  @ManyToOne((type) => CompanyEntity, (company) => company.quotes)
  company: CompanyEntity;

  toResponseQuote(): QuoteRO {
    const { id, companyId, date, value, company } = this;
    const responseObject: QuoteRO = { id, date, value, company };
    return responseObject;
  }
}
