import { Query, Resolver } from '@nestjs/graphql';
import { QuoteDTO, QuoteRO } from './quote.dto';
import { QuotesService } from './quotes.service';

@Resolver()
export class QuotesResolver {
  constructor(private quotesService: QuotesService) {}
  @Query(() => [QuoteRO])
  quotes() {
    return this.quotesService.showAll();
  }
}
