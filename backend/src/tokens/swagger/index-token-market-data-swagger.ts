import { ApiProperty } from '@nestjs/swagger';

export class IndexTokenMarketDataSwagger {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  symbol: string;

  @ApiProperty()
  current_price: number;

  constructor(token?: Partial<IndexTokenMarketDataSwagger>) {
    this.id = token?.id;
    this.name = token?.name;
    this.symbol = token?.symbol;
    this.current_price = token?.current_price;
  }
}
