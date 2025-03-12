import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
export enum ProspectStatus {
    Pending = "pending",
    Approved = "approved",
    Rejected = "rejected",
    Blacklisted = "blacklisted"
}

registerEnumType(ProspectStatus, {
    name: 'ProspectStatus',
    description: 'Status of a prospect',
});

@ObjectType()
export class Prospect {
    @Field(() => ID)
    id: string;

    @Field()
    name: string;

    @Field()
    lastname: string;

    @Field()
    birthday: Date;

    @Field()
    email: string;

    @Field()
    phone: string;

    @Field()
    status: string;

    constructor(
        id: string,
        name: string,
        lastname: string,
        birthday: Date,
        email: string,
        phone: string,
        status?: string
    ) {
        this.id = id;
        this.name = name;
        this.lastname = lastname;
        this.birthday = birthday;
        this.email = email;
        this.phone = phone;
        this.status = status ?? ProspectStatus.Pending;
    }

}