import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TokensModule } from './tokens/tokens.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongodb:27017/nest'),
    TokensModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
