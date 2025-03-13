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
    profilePhoto: string;

    @Field()
    country: string;

    @Field()
    city: string;

    @Field()
    fullAddress: string;

    @Field()
    locationCoordinates: string;

    @Field()
    bankName: string;

    @Field()
    bankAccountNumber: string;

    @Field()
    taxID: string;

    @Field()
    documentOrPassport: string;

    @Field()
    otherRelevantDetails: string;

    @Field()
    fileOtherInfo: string;

    @Field()
    status: string;

    constructor(
        id: string,
        name: string,
        lastname: string,
        birthday: Date,
        email: string,
        phone: string,
        profilePhoto: string,

        country: string,
        city: string,
        fullAddress: string,
        locationCoordinates: string,

        bankName: string,
        bankAccountNumber: string,
        taxID: string,
        documentOrPassport: string,

        otherRelevantDetails: string,
        fileOtherInfo: string,
        status?: string
    ) {
        this.id = id;
        this.name = name;
        this.lastname = lastname;
        this.birthday = birthday;
        this.email = email;
        this.phone = phone;
        this.profilePhoto = profilePhoto;
        this.country = country;
        this.city = city;
        this.fullAddress = fullAddress;
        this.locationCoordinates = locationCoordinates;

        this.bankName = bankName;
        this.bankAccountNumber = bankAccountNumber;
        this.taxID = taxID;
        this.documentOrPassport = documentOrPassport;

        this.otherRelevantDetails = otherRelevantDetails;
        this.fileOtherInfo = fileOtherInfo;
        this.status = status ?? ProspectStatus.Pending;
    }

}