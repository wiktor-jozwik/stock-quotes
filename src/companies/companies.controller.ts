import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
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

  @Get(':symbol')
  showOne(@Param('symbol') symbol: string) {
    return this.companiesService.show(symbol);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createCompany(@Body() data: CompanyDTO) {
    return this.companiesService.create(data);
  }

  @Put(':symbol')
  @UsePipes(new ValidationPipe())
  updateCompany(
    @Param('symbol') symbol: string,
    @Body() data: Partial<CompanyDTO>,
  ) {
    return this.companiesService.update(symbol, data);
  }

  @Delete(':symbol')
  @UsePipes(new ValidationPipe())
  deleteCompany(@Param('symbol') symbol: string) {
    return this.companiesService.delete(symbol);
  }
}
