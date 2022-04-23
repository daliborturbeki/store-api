import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { Cart, CartDocument } from 'src/schemas/cart.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, @InjectModel(Cart.name) private cartModel: Model<CartDocument>) {}

  async hashPassword(password: string) {
    if(password) {
      password = await bcrypt.hash(password,10);
    }
    return password;
  }

  async create(createUserDto: CreateUserDto) {
    //createUserDto.password = await this.hashPassword(createUserDto.password);
    const user = await new this.userModel(createUserDto).save();
    
    const createCartDto = {
      user:  user._id,
      items: [],
      totalQuantity: 0
    }
    await new this.cartModel(createCartDto).save();
  }

  async findAll() {
    return this.userModel.find().select('-password');
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.userModel.findOne({username});
  }

  async findOneByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  async update(_id: string, updateUserDto: UpdateUserDto) {
    updateUserDto.password = await this.hashPassword(updateUserDto.password);
    return this.userModel.updateOne({ _id }, { $set: {...updateUserDto}});
  }

  async remove(_id: string) {
    return this.userModel.deleteOne({ _id });
  }
}
