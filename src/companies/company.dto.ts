import { IsNotEmpty } from 'class-validator';
import { QuoteEntity } from 'src/quotes/quote.entity';

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
  quotes?: QuoteEntity[];
}
