import { QuoteEntity } from 'src/quotes/quote.entity';
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

  @Index('company_name_index')
  @Column('text')
  name: string;

  @Index('company_symbol_index')
  @Column({ type: 'text', unique: true })
  symbol: string;

  @OneToMany((type) => QuoteEntity, (quote) => quote.company)
  quotes: QuoteEntity[];

  toResponseCompany(): CompanyRO {
    const { id, name, symbol, quotes } = this;
    if (quotes) {
      const responseQuotes = quotes.map((quote) => quote.toResponseQuote());
      const toResponseObject = { id, name, symbol, quotes: responseQuotes };
      return toResponseObject;
    } else {
      return this;
    }
  }
}
