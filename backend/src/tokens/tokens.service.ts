import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';
import { Token, TokenDocument } from './entities/token.entity';

@Injectable()
export class TokensService {
  constructor(
    @InjectModel(Token.name) private tokenModel: Model<TokenDocument>,
  ) {}

  create(createTokenDto: CreateTokenDto) {
    const token = new this.tokenModel(createTokenDto);

    return token.save();
  }

  findAll() {
    return this.tokenModel.find();
  }

  findOne(id: string) {
    return this.tokenModel.findOne({
      id: id,
    });
  }

  update(id: string, updateTokenDto: UpdateTokenDto) {
    console.log(id, updateTokenDto);

    return this.tokenModel.findOneAndUpdate(
      {
        id: id,
      },
      {
        $set: updateTokenDto,
      },
      {
        new: true,
      },
    );
  }

  remove(id: string) {
    return this.tokenModel.deleteOne({ id: id }).exec();
  }
}
