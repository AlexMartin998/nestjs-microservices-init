import { Controller, UseGuards } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';

import { BillingService } from './billing.service';
import { JwtAuthGuard, RmqService } from 'libs/common';

@Controller()
export class BillingController {
  constructor(
    private readonly billingService: BillingService,
    private readonly rmqService: RmqService,
  ) {}

  @EventPattern('order_created')
  @UseGuards(JwtAuthGuard) // tb con rabbitmq
  async handleOrderCreated(@Payload() data: any, @Ctx() context: RmqContext) {
    this.billingService.bill(data);

    // si tiene exito y no hay errores, reconocera el msg y lo eliminara de la queue
    this.rmqService.ack(context);
  }
}
