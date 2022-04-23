import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from 'src/schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<ProductDocument>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    return await new this.productModel(createProductDto).save();
  }

  async findAll() {
    return await this.productModel.find();
  }

  async findOne(_id: string) {
    return await this.productModel.findById(_id);
  }

  async update(_id: string, updateProductDto: UpdateProductDto) {
    return await this.productModel.updateOne(
      { _id },
      { $set: { ...updateProductDto } },
    );
  }

  async remove(_id: string) {
    return await this.productModel.deleteOne({ _id });
  }
}
