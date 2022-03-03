import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { TokensService } from './tokens.service';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenQuantityDto } from './dto/update-token-quantity.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IndexTokenSwagger } from './swagger/index-token-swagger';
import { CreateTokenSwagger } from './swagger/create-token-swagger';
import { UpdateTokenSwagger } from './swagger/update-token-swagger';
import { BadRequestSwagger } from '../helpers/swagger/bad-request.swagger';
import { NotFoundSwagger } from '../helpers/swagger/not-found.swagger';
import { IndexAvailableTokenSwagger } from './swagger/index-available-token-swagger';
import { IndexTokenMarketDataSwagger } from './swagger/index-token-market-data-swagger';
import { TokensMarketQueryParams } from './swagger/tokens-market-query.swagger';
import { DeleteTokensDto } from './dto/delete-tokens.dto';

@Controller('api/v1/tokens')
@ApiTags('tokens')
export class TokensController {
  constructor(private readonly tokensService: TokensService) {}

  @Post()
  @ApiOperation({ summary: 'Add a new token to the portfolio' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Token was successfully added',
    type: CreateTokenSwagger,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid parameters',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Token already exists',
  })
  async create(@Body() createTokenDto: CreateTokenDto) {
    return await this.tokensService.create(createTokenDto);
  }

  @Get('available-tokens')
  @ApiOperation({ summary: 'List available tokens' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Available token list was successfully returned',
    type: IndexAvailableTokenSwagger,
    isArray: true,
  })
  async indexAvailableToken() {
    return await this.tokensService.findAllAvailable();
  }

  @Get('market-data')
  @ApiOperation({
    summary: 'Return the market information for the specified tokens',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Tokens market data were successfully returned',
    type: IndexTokenMarketDataSwagger,
    isArray: true,
  })
  async indexTokensMarketData(@Query('ids') ids: TokensMarketQueryParams) {
    return await this.tokensService.findMarketDataByIds(ids);
  }

  @Get()
  @ApiOperation({ summary: 'List saved tokens in the portfolio' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Token list was successfully returned',
    type: IndexTokenSwagger,
    isArray: true,
  })
  async index() {
    return await this.tokensService.findAll();
  }

  @Patch('update-quantity/:id')
  @ApiOperation({ summary: 'Update a token quantity in the portfolio' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Token was successfully updated',
    type: UpdateTokenSwagger,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid parameters',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Token not found',
    type: NotFoundSwagger,
  })
  async updateQuantity(
    @Param('id') id: string,
    @Body() updateTokenQuantityDto: UpdateTokenQuantityDto,
  ) {
    return await this.tokensService.updateQuantityById(
      id,
      updateTokenQuantityDto,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remove a token from the portfolio' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Token was successfully removed',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Token not found',
    type: NotFoundSwagger,
  })
  async delete(@Param('id') id: string) {
    await this.tokensService.deleteById(id);
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remove multiple tokens from the portfolio' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Tokens were successfully removed',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid parameters',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'One of the Tokens was not found',
    type: NotFoundSwagger,
  })
  async deleteMany(@Body() deleteTokensDto: DeleteTokensDto) {
    await this.tokensService.deleteManyByIds(deleteTokensDto.ids);
  }
}
