import { Inject, Injectable } from '@nestjs/common';
import { ProspectRepository, ProspectRepositoryToken } from '../../domain/port/prospect.repository';
import { Prospect } from '../../domain/model/prospect';

@Injectable()
export class GetProspectListUseCase {
    constructor(
        @Inject(ProspectRepositoryToken) private readonly prospectRepository: ProspectRepository    
    ) { }

    async execute(statuses?: string[]): Promise<Prospect[]> {
        return this.prospectRepository.findAll(statuses);
    }
}
