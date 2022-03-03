import { ApiProperty } from '@nestjs/swagger';

export class IndexAvailableTokenSwagger {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  symbol: string;

  constructor(token?: Partial<IndexAvailableTokenSwagger>) {
    this.id = token?.id;
    this.name = token?.name;
    this.symbol = token?.symbol;
  }
}
