import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const port = 3333;
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
  logger.log(`Application listerning on port ${port}`);

  console.log(process.env.NODE_ENV);
}
bootstrap();
