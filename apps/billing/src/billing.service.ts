import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class BillingService {
  private readonly logger = new Logger(BillingService.name);

  async bill(data: any) {
    this.logger.log('Billing ... ', data);
  }
}
