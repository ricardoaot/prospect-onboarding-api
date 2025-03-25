import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { FileUploaderPort } from '../../../../application/port/driven/file-uploader.port';
import { ConfigService } from '@nestjs/config';
import { Readable } from 'stream';

@Injectable()
export class CloudinaryAdapter implements FileUploaderPort {

    constructor(
        private readonly configService: ConfigService
    ) {
        cloudinary.config({
            cloud_name: this.configService.get<string>('CLOUDINARY_CLOUD_NAME'),
            api_key: this.configService.get<string>('CLOUDINARY_API_KEY'),
            api_secret: this.configService.get<string>('CLOUDINARY_API_SECRET'),
        });
    }
    async upload(fileStream: Readable, mimetype: string): Promise<string> {
        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    resource_type: 'auto',
                    format: mimetype.split('/')[1]
                },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result.secure_url);
                },
            );
            fileStream.pipe(uploadStream);
        });
    }
}
