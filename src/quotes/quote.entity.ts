import { CompanyEntity } from 'src/companies/company.entity';
import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { QuoteRO } from './quote.dto';

@Entity('quote')
@Index(['date', 'value'])
export class QuoteEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column('uuid') companyId: string;

  @Index('quote_date_index')
  @Column('text')
  date: string;

  @Index('quote_value_index')
  @Column('decimal')
  value: number;

  @ManyToOne((type) => CompanyEntity, (company) => company.quotes, {
    onDelete: 'CASCADE',
  })
  company: CompanyEntity;

  toResponseQuote(): QuoteRO {
    const { id, date, value, company } = this;
    const responseObject: QuoteRO = { id, date, value, company };
    return responseObject;
  }
}
