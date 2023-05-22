import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { AbstractDocument } from 'libs/common';

@Schema({ versionKey: false })
export class Order extends AbstractDocument {
  @Prop({ unique: true, index: true, required: true })
  name: string;

  @Prop()
  price: number;

  @Prop()
  phoneNumber: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
