import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Product } from './schema/product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private ProductModel : mongoose.Model<Product>
  ){}

  async create(product: CreateProductDto) : Promise<CreateProductDto> {
    return await this.ProductModel.create(product);
  }

  async findAll() : Promise<Product[]> {
    return await this.ProductModel.find();
  }

  async findOne(id: string) : Promise<Product> {
    const product = await this.ProductModel.findById(id)
    if(!product) {
      throw new NotFoundException('User not found')
    }
    return product
  }

  async update(id: string, product: UpdateProductDto) {
    const updatedProduct = await this.ProductModel.findByIdAndUpdate(id, product);
    return {updatedProduct: updatedProduct, message:"Product Info are up to date"}
  }

  async remove(id: string) {
    const deletedProd = await this.ProductModel.findByIdAndDelete(id);
    return {product: deletedProd, message:"Product is removed from the database"}
  }
}
