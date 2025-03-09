import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ProspectRepositoryToken } from '../../../domain/port/prospect.repository';
import { ProspectRepositoryImpl } from '../../adapter/persistence/prospect.repository.impl';
import { ProspectEntity, ProspectSchema } from '../../adapter/persistence/prospect.schema';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    MongooseModule.forFeature([{ name: ProspectEntity.name, schema: ProspectSchema }]),

  ],
  providers: [
    {
      provide: ProspectRepositoryToken,
      useClass: ProspectRepositoryImpl,
    },
  ],
  exports: [MongooseModule, ProspectRepositoryToken],
})
export class DatabaseModule {}
