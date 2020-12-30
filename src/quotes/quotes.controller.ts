import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UsePipes,
} from '@nestjs/common';
import { ValidationPipe } from 'src/shared/validation.pipe';
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

  @Post()
  @UsePipes(new ValidationPipe())
  createQuote(@Body() data: QuoteDTO) {
    return this.quotesService.create(data);
  }

  @Delete(':id')
  deleteQuote(@Param('id') id: string) {
    return this.quotesService.delete(id);
  }
}
