import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  //To convert data types as defined in the DTOs.
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors();
  app.useLogger(new Logger());

  await app.listen(3001);
}
bootstrap();
