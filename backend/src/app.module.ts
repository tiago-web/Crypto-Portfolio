import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TokensModule } from './tokens/tokens.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nest'), TokensModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
