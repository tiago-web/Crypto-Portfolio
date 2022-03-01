import { Model } from 'mongoose';
import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
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
    const foundToken = await this.findById(createTokenDto.id);

    if (foundToken) {
      throw new ConflictException('Token already exists.');
    }

    const token = new this.tokenModel(createTokenDto);

    await token.save();

    return token;
  }

  async findAll() {
    const tokenList = await this.tokenModel.find();

    return tokenList;
  }

  async findById(id: string) {
    const foundToken = await this.tokenModel.findOne({
      id: id,
    });

    return foundToken;
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
      // throw new NotFoundException('Token not found.');
      throw new Error('Token not found.');
    }

    await this.tokenModel.deleteOne({ id: id }).exec();
  }
}
