import { IsNotEmpty } from 'class-validator';
import { QuoteRO } from 'src/quotes/quote.dto';

export class CompanyDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  symbol: string;
}

export class CompanyRO {
  id: string;
  name: string;
  symbol: string;
  quotes?: QuoteRO[];
}
