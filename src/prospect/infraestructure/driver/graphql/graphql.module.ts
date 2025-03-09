import { Module } from '@nestjs/common';
import { ProspectResolver } from './resolvers/prospect.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { 
    CreateProspectUseCase, 
    GetProspectUseCase 
} from '../../../application/use-cases';
import { DatabaseModule } from '../../driven/database/database.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: true,
            playground: process.env.NODE_ENV === 'dev',
            debug: process.env.NODE_ENV === 'dev', 
        }),
        DatabaseModule
    ],
    providers: [
        ProspectResolver, 
        GetProspectUseCase, 
        CreateProspectUseCase
    ],

    exports: [GraphQLModule],
})
export class CustomGraphQLModule { }
