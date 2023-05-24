import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { RmqOptions } from '@nestjs/microservices';

import { RmqService } from 'libs/common';
import { AuthModule } from './auth.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const rmqService = app.get<RmqService>(RmqService);

  // true xq con Auth NO queremos manejar manualmente los messages
  app.connectMicroservice<RmqOptions>(rmqService.getOptions('AUTH', true));
  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);

  // hibrid app: http + rabbitmq
  await app.startAllMicroservices(); // iniciamos el microservice
  await app.listen(configService.get('PORT')); // tb escuchamos x ese puerto las http request
}
bootstrap();
