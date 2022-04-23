import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CartProductDocument = CartProduct & Document;

@Schema()
export class CartProduct {

  public _id: string;

  @Prop({ type: String, required: false })
  title: string;

  @Prop({ type: String, required: false })
  description: string;

  @Prop({ type: String, required: false })
  image: string;

  @Prop({ type: Number, required: false })
  price: number;

  @Prop({ type: Number, required: false, default: 0  })
  quantity: number;
  
  @Prop({ type: Number, required: false })
  totalPrice: number;
}

export const CartProductSchema = SchemaFactory.createForClass(CartProduct);
