import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Product } from './product.schema';

export type CartDocument = Cart & Document;

@Schema()
export class Cart {
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    required: true,
  })
  items: Product[];

  @Prop({ type: Number, required: true })
  totalQuantity: number;
  
  @Prop({ type: String, required: true })
  user: string;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
