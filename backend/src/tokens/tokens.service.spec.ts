import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { IAvailableToken } from './interfaces/available-token.interface';

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

  // describe('findAllAvailable', () => {
  //   it('should return a list of available tokens', async () => {
  //     const body: IAvailableToken[] = [];

  //     jest.spyOn(httpService, 'get').mockReturnValueOnce(
  //       of({
  //         status: 200,
  //         statusText: 'OK',
  //         config: {},
  //         headers: {},
  //         data: [
  //           {
  //             id: '01coin',
  //             symbol: 'zoc',
  //             name: '01coin',
  //           },
  //         ],
  //       }),
  //     );

  //     const result = await tokensService.findAllAvailable();

  //     expect(result).toEqual(body);
  //   });
  // });
});
