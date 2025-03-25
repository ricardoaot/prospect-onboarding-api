import { Resolver, Query } from '@nestjs/graphql';
import {
  GetCountryListUseCase
} from '../../../../../application/use-cases';
import { Country } from '../../../../../domain/model/country';

@Resolver(() => Country)
export class CountryResolver {

  constructor(
    private readonly getCountryListUseCase: GetCountryListUseCase
  ) { }

  
  @Query(() => [Country])
  async getCountries(): Promise<Country[]> {
    return this.getCountryListUseCase.execute();
  }

}
