import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private UserModel : mongoose.Model<User> ,
  ){};

  async create(user: CreateUserDto) : Promise<CreateUserDto> {
    return await this.UserModel.create(user);
  }

  async findAll(): Promise<User[]> {
    const users = await this.UserModel.find();
    return users;
  }

  async findOne(id: string) : Promise<User> {
    const user = await this.UserModel.findById(id)
    if(!user){
      throw new NotFoundException("User not found")
    }
    return user;
  }

  async update(id: string, user: UpdateUserDto) :  Promise<User> {
    const  updatedUser = this.UserModel.findByIdAndUpdate(id, user,{new: true, runValidators: true});
    if(!updatedUser){
      throw new NotFoundException('User not found')
    };
    return updatedUser;
  }

  async remove(id: string) {
    return await this.UserModel.findByIdAndDelete(id);
  }
}
