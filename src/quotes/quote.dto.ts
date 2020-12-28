import { IsNumber, IsString } from 'class-validator';
export class QuoteDTO {
  @IsString()
  name: string;
  @IsNumber()
  open: number;
  @IsNumber()
  high: number;
  @IsNumber()
  low: number;
  @IsNumber()
  close: number;
}
