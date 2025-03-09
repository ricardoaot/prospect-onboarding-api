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
}
