import { Module } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { QuotesController } from './quotes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuoteEntity } from './quote.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QuoteEntity])],
  providers: [QuotesService],
  controllers: [QuotesController],
})
export class QuotesModule {}
