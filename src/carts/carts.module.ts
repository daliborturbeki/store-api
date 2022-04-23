import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { Cart, CartSchema } from 'src/schemas/cart.schema';
import { CartProduct, CartProductSchema } from 'src/schemas/cart-product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Cart.name, schema: CartSchema },
    ]),
    MongooseModule.forFeature([
      { name: CartProduct.name, schema: CartProductSchema },
    ]),
  ],
  controllers: [CartsController],
  providers: [CartsService]
})
export class CartsModule {}
