import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyEntity } from './company.entity';
import { CompaniesResolver } from './companies.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyEntity])],
  providers: [CompaniesService, CompaniesResolver],
  controllers: [CompaniesController],
})
export class CompaniesModule {}
