import { Inject, Injectable } from '@nestjs/common';
import { Prospect } from '../../domain/model/prospect';
import { ProspectRepository, ProspectRepositoryToken  } from '../../domain/port/prospect.repository'

@Injectable()
export class CreateProspectUseCase {
    constructor(
        @Inject(ProspectRepositoryToken) private readonly prospectRepository: ProspectRepository
    ) {}

    async execute(prospect: Prospect): Promise<Prospect> {
        return this.prospectRepository.create(prospect);
    }
}