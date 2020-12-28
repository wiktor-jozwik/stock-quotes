import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuotesModule } from './quotes/quotes.module';

@Module({
  imports: [TypeOrmModule.forRoot(), QuotesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
