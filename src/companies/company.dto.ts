import { IsNotEmpty } from 'class-validator';
import { QuoteRO } from '../quotes/quote.dto';

export class CompanyDTO {
  @IsNotEmpty()
  symbol: string;
}

export class CompanyRO {
  symbol: string;
  quotes?: QuoteRO[];
}
