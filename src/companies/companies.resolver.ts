import { Query, Resolver } from '@nestjs/graphql';
import { CompaniesService } from './companies.service';

@Resolver()
export class CompaniesResolver {
  constructor(private companiesService: CompaniesService) {}
  @Query()
  companies() {
    return this.companiesService.showAll();
  }
}
