import { CompanyEntity } from 'src/companies/company.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('quote')
export class QuoteEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column('text') date: string;

  @Column('money') value: number;

  @ManyToOne((type) => CompanyEntity, (company) => company.quotes)
  company: CompanyEntity;
}
