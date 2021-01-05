import { QuoteEntity } from '../quotes/quote.entity';
import { Column, Entity, Index, OneToMany, PrimaryColumn } from 'typeorm';
import { CompanyRO } from './company.dto';

@Entity('company')
export class CompanyEntity {
  // @PrimaryGeneratedColumn('uuid') id: string;

  @Index('company_symbol_index')
  @PrimaryColumn({ type: 'text', unique: true })
  symbol: string;

  // @Index('company_name_index')
  // @Column('text')
  // name: string;

  @OneToMany((type) => QuoteEntity, (quote) => quote.company)
  quotes: QuoteEntity[];

  toResponseCompany(): CompanyRO {
    const { symbol, quotes } = this;
    if (quotes) {
      const responseQuotes = quotes.map((quote) => quote.toResponseQuote());
      const toResponseObject = { symbol, quotes: responseQuotes };
      return toResponseObject;
    } else {
      return this;
    }
  }
}
