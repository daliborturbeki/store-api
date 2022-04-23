import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  
  public _id: string;

  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: String, required: false })
  image: string;

  @Prop({ type: Number, required: true })
  price: number;
  
}

export const ProductSchema = SchemaFactory.createForClass(Product);
