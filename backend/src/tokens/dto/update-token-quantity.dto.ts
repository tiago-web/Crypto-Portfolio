import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateTokenQuantityDto {
  @IsNotEmpty()
  @ApiProperty()
  new_quantity: number;
}
