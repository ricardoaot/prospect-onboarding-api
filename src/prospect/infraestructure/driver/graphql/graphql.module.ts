import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { 
    CreateProspectUseCase, 
    GetProspectUseCase,
    GetProspectListUseCase,
    QualifyProspectUseCase,
    GetCountryListUseCase
} from '../../../application/use-cases';
import { DatabaseModule } from '../../driven/database/database.module';
import { ExternalApiModule } from '../../driven/external-api/country.module';
import { ProspectResolver } from './resolvers/prospect.resolver';
import { CountryResolver } from './resolvers/country.resolver';
import { DateResolver } from 'graphql-scalars';

@Module({
    imports: [
        ConfigModule.forRoot(),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: true,
            playground: process.env.NODE_ENV === 'dev',
            debug: process.env.NODE_ENV === 'dev', 
            resolvers: { Date: DateResolver }, 
        }),
        DatabaseModule,
        ExternalApiModule
    ],
    providers: [
        ProspectResolver, 
        GetProspectUseCase, 
        CreateProspectUseCase,
        GetProspectListUseCase,
        QualifyProspectUseCase,

        CountryResolver,
        GetCountryListUseCase
    ],

    exports: [GraphQLModule],
})
export class CustomGraphQLModule { }
