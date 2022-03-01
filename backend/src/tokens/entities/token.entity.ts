import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type TokenDocument = Token & Document;

@Schema()
export class Token {
  @Prop()
  @ApiProperty()
  id: string;

  @Prop()
  @ApiProperty()
  name: string;

  @Prop()
  @ApiProperty()
  symbol: string;

  @Prop()
  @ApiProperty()
  quantity: number;

  constructor(token?: Partial<Token>) {
    this.id = token?.id;
    this.name = token?.name;
    this.symbol = token?.symbol;
    this.quantity = token?.quantity;
  }
}

export const TokenSchema = SchemaFactory.createForClass(Token);
