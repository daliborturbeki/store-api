import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { map } from 'rxjs';
import { CartProduct } from 'src/schemas/cart-product.schema';
import { Cart, CartDocument } from 'src/schemas/cart.schema';
import { Product } from 'src/schemas/product.schema';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDBDto, UpdateCartReactDto } from './dto/update-cart.dto';

@Injectable()
export class CartsService {
  constructor(
    @InjectModel(Cart.name)
    private cartModel: Model<CartDocument>,
  ) { }

  async create(createCartDto: CreateCartDto) {
    return await new this.cartModel(createCartDto).save();
  }

  async findAll() {
    return await this.cartModel.find().populate('items');
  }

  async findOne(_id: string) {
    const cart = await this.cartModel.findOne().where('user').equals({_id}).populate('items');
    console.log('cart', cart);
    let totalQuantity = 0;

    let cartProducts : CartProduct[] = [];

    if(cart.items != null) {
      for(var i = 0; i < cart.items.length; i++) {
        let cartProduct : CartProduct = {
          _id: cart.items[i]._id.toString(),
          title: cart.items[i].title,
          description: cart.items[i].description,
          image: cart.items[i].image,
          price: cart.items[i].price,
          quantity: 1,
          totalPrice: cart.items[i].price,
        }

        totalQuantity++;
        cartProducts.push(cartProduct);
      }

      for(var i = 0; i < cartProducts.length; i++) {
        for(var j = i + 1; j < cartProducts.length; j++) {
          if(cartProducts[i]._id == cartProducts[j]._id) {
            cartProducts[i].quantity++;
            cartProducts[i].totalPrice += cartProducts[j].price;
            cartProducts.splice(j, 1);
            i--;
          }
          break;
        }
      }
    }

    //console.log({_id: cart._id.toString(), items: cartProducts, totalQuantity: totalQuantity });

    return { _id: cart._id.toString(), items: cartProducts, totalQuantity: totalQuantity, user: cart.user };
  }

  async update(_id: string, updateCartDto: UpdateCartReactDto) {
    console.log(updateCartDto);
    let newCart : UpdateCartDBDto = {
      items: [],
      totalQuantity: 0,
      user: updateCartDto.user
    }

    for(var i = 0; i < updateCartDto.items.length; i++) {
      for(var j = 0; j < updateCartDto.items[i].quantity; j++) {
        
        newCart.items.push(updateCartDto.items[i]._id);
        newCart.totalQuantity++;
      }
    }

    return await this.cartModel.updateOne(
       { _id } ,
       { $set: { items: newCart.items, totalQuantity: newCart.totalQuantity, user: newCart.user } },
    );

  }

  async remove(_id: string) {
    return await this.cartModel.deleteOne({ _id });
  }
}
