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

  @Get()
  @ApiOperation({ summary: 'List saved tokens' })
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
  @ApiOperation({ summary: 'Update a token quantity' })
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
  @ApiOperation({ summary: 'Remove a token' })
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
}
