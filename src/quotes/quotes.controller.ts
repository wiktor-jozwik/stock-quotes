import { Controller, Delete, Get, Param, Post } from '@nestjs/common';

@Controller('quotes')
export class QuotesController {
  // constructor
  @Get()
  showAllQuotes() {}

  @Get(':id')
  readSingleQuote(@Param('id') id: string) {}

  @Get(':name')
  readStockQuotes(@Param(':name') name: string) {}

  @Post()
  createQuote() {}

  @Delete(':id')
  deleteQuote(@Param('id') id: string) {}
}
