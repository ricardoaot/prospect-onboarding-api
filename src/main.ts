import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  //To convert data types as defined in the DTOs.
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors();
  app.useLogger(new Logger());
  app.use(
    graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 })
  );

  await app.listen(3001);
}
bootstrap();
