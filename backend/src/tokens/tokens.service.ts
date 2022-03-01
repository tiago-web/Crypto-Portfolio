import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenQuantityDto } from './dto/update-token-quantity.dto';
import { Token, TokenDocument } from './entities/token.entity';

@Injectable()
export class TokensService {
  constructor(
    @InjectModel(Token.name) private tokenModel: Model<TokenDocument>,
  ) {}

  async create(createTokenDto: CreateTokenDto) {
    const token = new this.tokenModel(createTokenDto);

    return await token.save();
  }

  async findAll() {
    return await this.tokenModel.find();
  }

  async findById(id: string) {
    return await this.tokenModel.findOne({
      id: id,
    });
  }

  async updateQuantityById(
    id: string,
    updateTokenQuantityDto: UpdateTokenQuantityDto,
  ) {
    const foundToken = await this.findById(id);

    if (!foundToken) {
      throw new NotFoundException('Token not found.');
    }

    const updatedToken = await this.tokenModel.findOneAndUpdate(
      {
        id: id,
      },
      {
        $set: { quantity: updateTokenQuantityDto.new_quantity },
      },
      {
        new: true,
      },
    );

    return updatedToken;
  }

  async deleteById(id: string) {
    const foundToken = await this.findById(id);

    if (!foundToken) {
      throw new NotFoundException('Token not found.');
    }

    await this.tokenModel.deleteOne({ id: id }).exec();
  }
}
