import { Inject, Injectable } from '@nestjs/common';
import { CountryRepository, CountryRepositoryToken } from '../port/driven/country.repository';
import { Country } from '../../domain/model/country';

@Injectable()
export class GetCountryListUseCase {
    constructor(
        @Inject(CountryRepositoryToken) private readonly countryRepository: CountryRepository    
    ) { }

    async execute(): Promise<Country[]> {
        return this.countryRepository.getCountries();
    }
}
