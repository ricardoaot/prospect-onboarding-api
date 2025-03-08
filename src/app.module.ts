import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CustomGraphQLModule } from './prospect/infraestructure/graphql/graphql.module';
import { DatabaseModule } from './prospect/infraestructure/persistence/database.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CustomGraphQLModule,
    DatabaseModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
