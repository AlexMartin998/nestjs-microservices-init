import { NestFactory } from '@nestjs/core';

import { RmqService } from 'libs/common';
import { BillingModule } from './billing.module';

async function bootstrap() {
  const app = await NestFactory.create(BillingModule);

  // microservice
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('BILLING')); // queue name

  // await app.listen(3000);  // no xq es 1 microservice
  await app.startAllMicroservices();
}
bootstrap();
