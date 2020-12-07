import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';

async function bootstrap() {
                             const serverConfig = config.get('server');
                             const logger = new Logger('bootstrap');
                             const port =
                               process.env.PORTx || serverConfig['port'];
                             const app = await NestFactory.create(AppModule);
                             await app.listen(port);

                             logger.log(
                               `Application listerning on port ${port}`,
                             );


                             console.log(process.env.PORTx);
                           }
bootstrap();
