import { ObjectType, Field, ID } from '@nestjs/graphql';

/*
export class Prospect {
    constructor(
        public name: string,
        public lastname: string,
        public birthday: Date,
        public email: string,
        public phone: string,
        public status: 'pending' | 'approved' | 'rejected' = 'pending',
    ) {}
}*/
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

    constructor(
        id: string,
        name: string,
        lastname: string,
        birthday: Date,
        email: string,
        phone: string
    ) {
        this.id = id;
        this.name = name;
        this.lastname = lastname;
        this.birthday = birthday;
        this.email = email;
        this.phone = phone;
    }

}