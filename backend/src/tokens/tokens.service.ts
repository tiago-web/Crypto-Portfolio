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
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { IAvailableToken } from './interfaces/available-token.interface';
import { ITokenMarketData } from './interfaces/token-market-data.interface';
import { FindTokensMarketDataDto } from './dto/find-tokens-market-data.dto';

@Injectable()
export class TokensService {
  constructor(
    @InjectModel(Token.name) private tokenModel: Model<TokenDocument>,
    private readonly httpService: HttpService,
  ) {}

  async create(createTokenDto: CreateTokenDto) {
    const foundToken = await this.findById(createTokenDto.id);

    if (foundToken) {
      throw new ConflictException('Token already exists.');
    }

    const token = new this.tokenModel(createTokenDto);

    await token.save();

    const createdTokenWithCurrentMarketPrice = await this.findMarketDataById(
      createTokenDto.id,
    );

    const tokenAmount =
      token.quantity * createdTokenWithCurrentMarketPrice.current_price;

    return {
      ...createdTokenWithCurrentMarketPrice,
      symbol: createdTokenWithCurrentMarketPrice.symbol.toUpperCase(),
      quantity: token.quantity,
      amount: tokenAmount,
    };
  }

  async findAllAvailable() {
    let availableTokens: IAvailableToken[] = [];

    const url = 'https://api.coingecko.com/api/v3/coins/list';

    const response = this.httpService.get<IAvailableToken[]>(url);

    const { data, status } = await lastValueFrom(response);

    if (status === 200 && data) {
      const sortedTokensWithCaptilizedSymbol = data
        .map((token) => ({
          ...token,
          symbol: token.symbol.toUpperCase(),
        }))
        .sort((a, b) => {
          if (a.symbol < b.symbol) {
            return -1;
          }
          if (a.symbol > b.symbol) {
            return 1;
          }
          return 0;
        })
        .filter((token) => token.symbol !== '' && token.id !== ''); // remove tokens with empty symbol or id

      availableTokens = sortedTokensWithCaptilizedSymbol;
    }

    return availableTokens;
  }

  async findMarketDataById(id: string) {
    let tokenData: ITokenMarketData = {} as ITokenMarketData;

    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${id}`;

    const response = this.httpService.get<ITokenMarketData[]>(url);

    const { data, status } = await lastValueFrom(response);

    if (status === 200 && data) {
      tokenData = {
        id: data[0].id,
        symbol: data[0].symbol.toUpperCase(),
        name: data[0].name,
        current_price: data[0].current_price,
      };
    }

    return tokenData;
  }

  async findMarketDataByIds(ids: FindTokensMarketDataDto | string) {
    let tokenData: ITokenMarketData[] = [];

    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}`;

    const response = this.httpService.get<ITokenMarketData[]>(url);

    const { data, status } = await lastValueFrom(response);

    if (status === 200 && data) {
      tokenData = data.map((token) => ({
        id: token.id,
        symbol: token.symbol.toUpperCase(),
        name: token.name,
        current_price: token.current_price,
      }));
    }

    return tokenData;
  }

  async findAll() {
    const tokenList = await this.tokenModel.find();

    if (tokenList.length === 0) {
      return tokenList;
    }

    const ids = tokenList.map((token) => token.id).join(',');

    let tokenListWithCurrentMarketPrice = await this.findMarketDataByIds(ids);

    // Add quantity & amount to the object
    tokenListWithCurrentMarketPrice = tokenListWithCurrentMarketPrice.map(
      (token) => {
        const foundToken = tokenList.find(
          (tokenWithQuantity) => token.id === tokenWithQuantity.id,
        );

        if (foundToken) {
          const tokenAmount = foundToken.quantity * token.current_price;

          return {
            ...token,
            symbol: token.symbol.toUpperCase(),
            quantity: foundToken.quantity,
            amount: tokenAmount,
          };
        }
      },
    );

    return tokenListWithCurrentMarketPrice;
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

    const updatedTokenWithCurrentMarketPrice = await this.findMarketDataById(
      id,
    );

    const tokenAmount =
      updatedToken.quantity * updatedTokenWithCurrentMarketPrice.current_price;

    return {
      ...updatedTokenWithCurrentMarketPrice,
      quantity: updatedToken.quantity,
      amount: tokenAmount,
    };
  }

  async deleteById(id: string) {
    const foundToken = await this.findById(id);

    if (!foundToken) {
      throw new NotFoundException('Token not found.');
    }

    await this.tokenModel.deleteOne({ id: id }).exec();
  }

  async deleteManyByIds(ids: string[]) {
    if (!ids) {
      throw new NotFoundException(
        'One of the tokens was not found in the database.',
      );
    }

    for (let i = 0; i < ids.length; i++) {
      const foundToken = await this.findById(ids[i]);

      if (!foundToken) {
        throw new NotFoundException(
          'One of the tokens was not found in the database.',
        );
      }
    }

    await this.tokenModel.deleteMany({ id: { $in: ids } }).exec();
  }
}
