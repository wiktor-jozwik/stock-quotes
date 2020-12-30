import {
  Body,
  Controller,
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

  @Get(':id')
  showOne(@Param('id') symbol: string) {
    return this.companiesService.show(symbol);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createCompany(@Body() data: CompanyDTO) {
    return this.companiesService.create(data);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  updateCompany(@Param('id') id: string, @Body() data: Partial<CompanyDTO>) {
    return this.companiesService.update(id, data);
  }
}
