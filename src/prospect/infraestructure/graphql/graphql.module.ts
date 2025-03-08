import { Module } from '@nestjs/common';
import { ProspectResolver } from './resolvers/prospect.resolver';
import { GetProspect } from '../../application/use-cases/get-prospect';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
    providers: [ProspectResolver, GetProspect],
    imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: true,
        }),
    ],
    exports: [GraphQLModule],
})
export class CustomGraphQLModule { }
