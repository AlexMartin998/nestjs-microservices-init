import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

import { RmqModule } from '../rmq/rmq.module';
import { AUTH_SERVICE } from './service';

@Module({
  imports: [RmqModule.register({ name: AUTH_SERVICE })],
  exports: [RmqModule], // tendra disponible el service de Auth
})
export class AuthModule implements NestModule {
  // configurar 1 middleware para q todo modulo q importe este authmodle, use cookieparser
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieParser()).forRoutes('*');
  }
}
