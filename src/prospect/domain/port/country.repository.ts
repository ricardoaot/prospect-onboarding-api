import { Country } from "../model/country";
export const CountryRepositoryToken = Symbol('CountryRepository');

export interface CountryRepository {

    getCountries(): Promise<Country[]>

}