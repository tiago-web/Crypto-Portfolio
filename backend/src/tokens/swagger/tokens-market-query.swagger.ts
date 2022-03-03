import { ApiProperty } from '@nestjs/swagger';

export class TokensMarketQueryParams {
  @ApiProperty({
    type: String,
    description: 'Comma separated ids of the coins',
  })
  ids: string;

  constructor(ids?: string) {
    this.ids = ids;
  }
}
