import { Module } from '@nestjs/common';
import { CountryRepositoryToken } from '../../../domain/port/country.repository';
import { CountryRepositoryImpl } from '../../adapter/persistence/country.repository.impl';

@Module({
  imports: [],
  providers: [
    {
      provide: CountryRepositoryToken,
      useClass: CountryRepositoryImpl,
    },
  ],
  exports: [CountryRepositoryToken],
})
export class ExternalApiModule {}
