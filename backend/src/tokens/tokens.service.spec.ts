import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
// import { of } from 'rxjs';
// import { CreateTokenDto } from './dto/create-token.dto';
// import { UpdateTokenQuantityDto } from './dto/update-token-quantity.dto';
// import { IAvailableToken } from './interfaces/available-token.interface';
// import {
//   mockFoundToken,
//   mockNewToken,
//   mockTokenList,
//   mockUpdatedToken,
// } from './mocks';
import { TokensService } from './tokens.service';

describe('TokensService', () => {
  let tokensService: TokensService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: TokensService,
          useValue: {
            create: jest.fn(),
            findAllAvailable: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
            updateQuantityById: jest.fn(),
            deleteById: jest.fn(),
          },
        },
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    tokensService = module.get<TokensService>(TokensService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(tokensService).toBeDefined();
    expect(httpService).toBeDefined();
  });

  // describe('create', () => {
  //   it('should create a new token', async () => {
  //     const body: CreateTokenDto = {
  //       id: 'ethereum',
  //       name: 'Ethereum',
  //       symbol: 'ETH',
  //       quantity: 1,
  //     };

  //     const createdToken = await tokensService.create(body);

  //     const foundToken = await tokensService.findById(body.id);

  //     expect(createdToken).toEqual(mockNewToken);
  //     expect(tokensService.create).toHaveBeenCalledTimes(1);

  //     expect(foundToken).toEqual(mockFoundToken);
  //     expect(tokensService.findById).toHaveBeenCalledTimes(1);
  //   });
  // });

  // describe('findAllAvailable', () => {
  //   it('should return a list of available tokens', async () => {
  //     const body: IAvailableToken[] = [];

  //     jest.spyOn(httpService, 'get').mockReturnValueOnce(
  //       of({
  //         status: 200,
  //         statusText: 'OK',
  //         config: {},
  //         headers: {},
  //         data: [],
  //       }),
  //     );

  //     const result = await tokensService.findAllAvailable();

  //     expect(result).toEqual(body);
  //   });
  // });

  // describe('findById', () => {
  //   it('should find a token by its id', async () => {
  //     const body: CreateTokenDto = {
  //       id: 'ethereum',
  //       name: 'Ethereum',
  //       symbol: 'ETH',
  //       quantity: 1,
  //     };
  //     await tokensService.create(body);
  //     const foundToken = await tokensService.findById(body.id);

  //     expect(foundToken).toEqual(mockFoundToken);
  //     expect(tokensService.findById).toHaveBeenCalledTimes(1);
  //   });
  // });

  // describe('findAll', () => {
  //   it('should find all tokens saved', async () => {
  //     const tokenList = await tokensService.findAll();

  //     expect(tokenList).toEqual(mockTokenList);
  //     expect(tokensService.findAll).toHaveBeenCalledTimes(1);
  //   });
  // });

  // describe('updateQuantityById', () => {
  //   it('should update a token quantity by its id successfully', async () => {
  //     const body: UpdateTokenQuantityDto = {
  //       new_quantity: 2,
  //     };

  //     const updatedToken = await tokensService.updateQuantityById(
  //       'ethereum',
  //       body,
  //     );

  //     expect(updatedToken).toEqual(mockUpdatedToken);
  //     expect(tokensService.updateQuantityById).toHaveBeenCalledTimes(1);
  //     expect(tokensService.updateQuantityById).toHaveBeenCalledWith(
  //       'ethereum',
  //       body,
  //     );
  //   });
  // });

  // describe('deleteById', () => {
  //   it('delete a token by its id', async () => {
  //     const deleteResult = await tokensService.deleteById('ethereum');

  //     expect(deleteResult).toBeUndefined();
  //     expect(tokensService.deleteById).toHaveBeenCalledTimes(1);
  //   });
  // });
});
