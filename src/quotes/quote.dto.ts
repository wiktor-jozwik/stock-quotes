import { IsNumber, IsString } from 'class-validator';
import { CompanyEntity } from '../companies/company.entity';
export class QuoteDTO {
  @IsString()
  companyId: string;
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
