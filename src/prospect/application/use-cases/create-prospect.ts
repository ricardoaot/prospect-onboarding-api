import { Inject, Injectable, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Prospect } from '../../domain/model/prospect';
import { ProspectRepository, ProspectRepositoryToken } from '../port/driven/prospect.repository'
import { CreateProspectDto } from '../dto/create-prospect.dto';
import { CloudinaryAdapter } from '../../infraestructure/adapter/driven/external-services/cloudinary.adapter';
import { Readable } from 'stream';

@Injectable()
export class CreateProspectUseCase {
    constructor(
        @Inject(ProspectRepositoryToken) private readonly prospectRepository: ProspectRepository,
        private readonly cloudinaryAdapter: CloudinaryAdapter
    ) { }

    
    @UseInterceptors(FileInterceptor('file'))
    async execute(
        data: CreateProspectDto,
        @UploadedFile() file: {
            filename: string;
            mimetype: string;
            encoding: string;
            createReadStream: () => Readable;
        }
    ): Promise<Prospect> {
        
        // Upload the image to Cloudinary
        const imageUrl = await this.cloudinaryAdapter.upload(file.createReadStream(), file.mimetype);

        // Create Prospect Instance
        const prospect = new Prospect(
            '',
            data.name,
            data.lastname,
            data.birthday,
            data.email,
            data.phone,
            imageUrl,
            data.country,
            data.city,
            data.fullAddress,
            data.locationCoordinates,
            data.bankName,
            data.bankAccountNumber,
            data.taxID,
            data.documentOrPassport,
            data.otherRelevantDetails,
            data.fileOtherInfo,
        );

        // Save Prospect
        return this.prospectRepository.create(prospect);

    }
}