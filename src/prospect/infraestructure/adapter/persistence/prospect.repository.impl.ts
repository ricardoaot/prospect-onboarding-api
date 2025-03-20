import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProspectRepository } from '../../../domain/port/prospect.repository';
import { ProspectEntity } from './prospect.schema';
import { Prospect } from '../../../domain/model/prospect';
import { MongoServerError } from 'mongodb';
import { GraphQLError } from 'graphql';

@Injectable()
export class ProspectRepositoryImpl implements ProspectRepository {
    constructor(
        @InjectModel(ProspectEntity.name) private readonly prospectModel: Model<ProspectEntity>
    ) { }

    async create(prospect: Prospect): Promise<Prospect> {
        try {
            const createdProspect = new this.prospectModel(prospect);
            const savedProspect = await createdProspect.save();

            return new Prospect(
                savedProspect.id,
                savedProspect.name,
                savedProspect.lastname,
                savedProspect.birthday,
                savedProspect.email,
                savedProspect.phone,
                savedProspect.profilePhoto,
                savedProspect.country,
                savedProspect.city,
                savedProspect.fullAddress,
                savedProspect.locationCoordinates,
                savedProspect.bankName,
                savedProspect.bankAccountNumber,
                savedProspect.taxID,
                savedProspect.documentOrPassport,
                savedProspect.otherRelevantDetails,
                savedProspect.fileOtherInfo,
            );
        } catch (error) {
            console.error('Database Error:', error); // Para depuración

            if (error instanceof MongoServerError && error.code === 11000) {
                throw new GraphQLError('Prospect email already exists', {
                    extensions: { code: 'PROSPECT_EMAIL_ALREADY_EXISTS', status: 400 },
                });
            }

            throw new GraphQLError('Unknown error occurred', {
                extensions: { code: 'UNKNOWN_ERROR', status: 500 },
            });
        }
    }


    async findAll(
        status?: string[]
    ): Promise<Prospect[]> {

        const prospects = await this.prospectModel.find(
            { status: { $in: status } }
        ).exec();
        return prospects.map(
            (prospect) =>
                new Prospect(
                    prospect._id.toString(),
                    prospect.name,
                    prospect.lastname,
                    prospect.birthday,
                    prospect.email,
                    prospect.phone,
                    prospect.profilePhoto,
                    prospect.country,
                    prospect.city,
                    prospect.fullAddress,
                    prospect.locationCoordinates,
                    prospect.bankName,
                    prospect.bankAccountNumber,
                    prospect.taxID,
                    prospect.documentOrPassport,
                    prospect.otherRelevantDetails,
                    prospect.fileOtherInfo,
                    prospect.status
                )
        );
    }

    async updateField(id: string, field: string, value: any): Promise<boolean> {
        const updateObject = { [field]: value };
        const result = await this.prospectModel.updateOne({ _id: id }, { $set: updateObject }).exec();
        return result.modifiedCount > 0;
    }
}
