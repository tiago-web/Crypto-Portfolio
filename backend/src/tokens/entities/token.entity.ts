import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TokenDocument = Token & Document;

@Schema()
export class Token {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  symbol: string;

  @Prop()
  quantity: number;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
