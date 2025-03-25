import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ProspectRepositoryToken } from '../../../../application/port/driven/prospect.repository';
import { ProspectRepositoryImpl } from '../../../adapter/driven/persistence/prospect.repository.impl';
import { ProspectEntity, ProspectSchema } from '../../../adapter/driven/persistence/prospect.schema';

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
