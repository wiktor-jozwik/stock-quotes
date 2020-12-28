import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { QuoteDTO } from './quote.dto';
import { QuotesService } from './quotes.service';

@Controller('quotes')
export class QuotesController {
  constructor(private quotesService: QuotesService) {}
  @Get()
  showAllQuotes() {
    return this.quotesService.showAll();
  }

  @Get(':id')
  readSingleQuote(@Param('id') id) {
    return this.quotesService.readOne(id);
  }

  @Get('company/:name')
  readCompanyQuotes(@Param('name') name: string) {
    return this.quotesService.readOneCompany(name);
  }

  @Post()
  createQuote(@Body() data: QuoteDTO) {
    return this.quotesService.create(data);
  }

  @Delete(':id')
  deleteQuote(@Param('id') id: string) {
    return this.quotesService.delete(id);
  }
}
