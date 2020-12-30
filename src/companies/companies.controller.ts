import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompanyDTO } from './company.dto';
import { ValidationPipe } from 'src/shared/validation.pipe';

@Controller('companies')
export class CompaniesController {
  constructor(private companiesService: CompaniesService) {}
  @Get()
  showAllCompanies() {
    return this.companiesService.showAll();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createCompany(@Body() data: CompanyDTO) {
    return this.companiesService.createCompany(data);
  }
}
