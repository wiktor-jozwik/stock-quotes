import { IsNumber, IsString } from 'class-validator';
import { CompanyEntity } from 'src/companies/company.entity';
export class QuoteDTO {
  @IsString()
  date: string;
  @IsNumber()
  value: number;
}

export class QuoteRO {
  id: string;
  date: string;
  value: number;
  company: CompanyEntity;
}
