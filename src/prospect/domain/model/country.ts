import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Country {
    @Field(() => ID)
    id: string;

    @Field()
    name: string;

    @Field()
    hasUSD: boolean;

    constructor(
        id: string,
        name: string,
        hasUSD: boolean,
    ) {
        this.id = id;
        this.name = name;
        this.hasUSD = hasUSD;
    }
}