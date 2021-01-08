import { Module } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { QuotesController } from './quotes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuoteEntity } from './quote.entity';
import { CompanyEntity } from '../companies/company.entity';
import { QuotesResolver } from './quotes.resolver';
import { CompaniesService } from '../companies/companies.service';

@Module({
  imports: [TypeOrmModule.forFeature([QuoteEntity, CompanyEntity])],
  providers: [QuotesService, QuotesResolver, CompaniesService],
  controllers: [QuotesController],
})
export class QuotesModule {}
