//approve - reject (normal rejection or blacklisted)

import { Inject, Injectable } from '@nestjs/common';
import { Prospect } from '../../domain/model/prospect';
import { ProspectRepository, ProspectRepositoryToken  } from '../port/driven/prospect.repository'

@Injectable()
export class QualifyProspectUseCase {
    constructor(
        @Inject(ProspectRepositoryToken) private readonly prospectRepository: ProspectRepository
    ) {}

    async execute(id: string, field: string, value: any): Promise<boolean> {
        return this.prospectRepository.updateField(id, field, value);
    }
}