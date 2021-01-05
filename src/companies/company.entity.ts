import { QuoteEntity } from '../quotes/quote.entity';
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CompanyRO } from './company.dto';

@Entity('company')
export class CompanyEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Index('company_symbol_index')
  @Column({ type: 'text', unique: true })
  symbol: string;

  @Index('company_name_index')
  @Column('text')
  name: string;

  @OneToMany((type) => QuoteEntity, (quote) => quote.company)
  quotes: QuoteEntity[];

  toResponseCompany(): CompanyRO {
    const { symbol, name, quotes } = this;
    if (quotes) {
      const responseQuotes = quotes.map((quote) => quote.toResponseQuote());
      const toResponseObject = { symbol, name, quotes: responseQuotes };
      return toResponseObject;
    } else {
      return this;
    }
  }
}
