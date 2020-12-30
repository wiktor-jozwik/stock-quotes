import { QuoteEntity } from 'src/quotes/quote.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('company')
export class CompanyEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column('text') name: string;

  @Column({ type: 'text', unique: true }) symbol: string;

  @OneToMany((type) => QuoteEntity, (quote) => quote.company)
  quotes: QuoteEntity[];
}
