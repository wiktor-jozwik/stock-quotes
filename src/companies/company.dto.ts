import { IsNotEmpty, IsString } from 'class-validator';
import { QuoteRO } from '../quotes/quote.dto';

export class CompanyDTO {
  @IsNotEmpty()
  symbol: string;
  @IsString()
  name: string;
}

export class CompanyRO {
  symbol: string;
  name: string;
  quotes?: QuoteRO[];
}
