import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProspectRepository } from '../../../domain/port/prospect.repository';
import { ProspectEntity } from './prospect.schema';
import { Prospect } from '../../../domain/model/prospect';

@Injectable()
export class ProspectRepositoryImpl implements ProspectRepository {
    constructor(
        @InjectModel(ProspectEntity.name) private readonly prospectModel: Model<ProspectEntity>
    ) { }

    async create(prospect: Prospect): Promise<Prospect> {

        const createdProspect = new this.prospectModel(prospect);
        const savedProspect = await createdProspect.save();

        return new Prospect(
            savedProspect.id,
            savedProspect.name,
            savedProspect.lastname,
            savedProspect.birthday,
            savedProspect.email,
            savedProspect.phone,
        );
    }
    //    async findAll(): Promise<Prospect[]> {

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
