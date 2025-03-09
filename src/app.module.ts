import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomGraphQLModule } from './prospect/infraestructure/driver/graphql/graphql.module';
import { DatabaseModule } from './prospect/infraestructure/driven/database/database.module';

@Module({
  imports: [
    CustomGraphQLModule,
    DatabaseModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
