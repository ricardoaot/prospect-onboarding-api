import { Readable } from 'stream';

export interface FileUploaderPort {
    upload(
        fileStream: Readable,
        mimetype: string
    ): Promise<string>;
}