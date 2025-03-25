
import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsEmail, Length, IsDate, IsOptional, Matches } from 'class-validator';
import { DateResolver } from 'graphql-scalars';

@InputType()
export class CreateProspectDto {
    @Field(() => String)
    @IsNotEmpty()
    @Length(2, 50)
    name: string;

    @Field(() => String)
    @IsNotEmpty()
    @Length(2, 50)
    lastname: string;

    @Field(() => DateResolver)
    @IsNotEmpty()
    @IsDate()
    birthday: Date;

    @Field(() => String)
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @Field(() => String)
    @IsNotEmpty()
    //@Matches(/^\+\d{1,3}-\d{7,15}$/, { message: 'Phone must be in international format (e.g., +1-123456789)' })
    phone: string;

    @Field(() => String)
    @IsNotEmpty()
    country: string;

    @Field(() => String)
    @IsNotEmpty()
    city: string;

    @Field(() => String)
    @IsOptional()
    fullAddress?: string;

    @Field(() => String)
    @IsOptional()
    locationCoordinates?: string;

    @Field(() => String)
    @IsNotEmpty()
    bankName: string;

    @Field(() => String)
    @IsNotEmpty()
    bankAccountNumber: string;

    @Field(() => String)
    @IsNotEmpty()
    @Length(8, 20, { message: 'Tax ID must be between 8 and 20 characters' })
    taxID?: string;

    @Field(() => String)
    @IsNotEmpty()
    documentOrPassport?: string;

    @Field(() => String)
    @IsOptional()
    otherRelevantDetails?: string;

    @Field(() => String)
    @IsOptional()
    fileOtherInfo?: string;
}
