import { Injectable } from '@nestjs/common';
import { CountryRepository } from '../../../domain/port/country.repository';
import { Country } from '../../../domain/model/country';

@Injectable()
export class CountryRepositoryImpl implements CountryRepository {
    //TODO - move API_URL to env file
    private readonly API_URL = 'https://restcountries.com/v3.1';

    async getCountries(): Promise<Country[]> {

        const response = await fetch(`${this.API_URL}/all?fields=cca3,name,currencies`);
        if (!response.ok) {
            throw new Error(`Error fetching country: ${response.statusText}`);
        }

        const countryData = await response.json();

        const formatedCountries =  countryData.map(
            (country) =>
                new Country(
                    country.cca3,
                    country.name.common,
                    Object.keys(country.currencies).includes("USD") 
                )
        );

        //Return sorted countries
        return formatedCountries.sort((a, b) => a.name.localeCompare(b.name));
        
    }
}
