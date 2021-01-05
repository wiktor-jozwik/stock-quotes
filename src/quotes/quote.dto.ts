import { IsNumber, IsString } from 'class-validator';
import { CompanyRO } from 'src/companies/company.dto';

export class QuoteDTO {
  @IsString()
  symbol: string;

  name: string;
  @IsString()
  date: string;

  @IsNumber()
  value: number;
}

export class QuoteRO {
  id?: string;
  date: string;
  value: number;
  company: CompanyRO;
}
