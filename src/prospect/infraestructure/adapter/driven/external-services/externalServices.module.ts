import { Module } from '@nestjs/common';
import { CountryRepositoryToken } from '../../../../application/port/driven/country.repository';
import { CountryRepositoryImpl } from './country.service.adapter';
import { CloudinaryAdapter } from './cloudinary.adapter';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
  ],
  providers: [
    {
      provide: CountryRepositoryToken,
      useClass: CountryRepositoryImpl,
    },
    CloudinaryAdapter
  ],
  exports: [
    CountryRepositoryToken, 
    CloudinaryAdapter
  ],
})
export class ExternalServicesModule { }
