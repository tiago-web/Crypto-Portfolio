import { Test, TestingModule } from '@nestjs/testing';
import { CreateTokenDto } from './dto/create-token.dto';
import { DeleteTokensDto } from './dto/delete-tokens.dto';
import { UpdateTokenQuantityDto } from './dto/update-token-quantity.dto';
import {
  mockAvailableTokenList,
  mockMarketDataTokenList,
  mockNewToken,
  mockTokenList,
  mockUpdatedToken,
} from './mocks';
import { TokensMarketQueryParams } from './swagger/tokens-market-query.swagger';
import { TokensController } from './tokens.controller';
import { TokensService } from './tokens.service';

describe('TokensController', () => {
  let tokensController: TokensController;
  let tokensService: TokensService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TokensController],
      providers: [
        {
          provide: TokensService,
          useValue: {
            create: jest.fn().mockReturnValue(mockNewToken),
            findAllAvailable: jest.fn().mockReturnValue(mockAvailableTokenList),
            findMarketDataByIds: jest
              .fn()
              .mockReturnValue(mockMarketDataTokenList),
            findAll: jest.fn().mockReturnValue(mockTokenList),
            updateQuantityById: jest.fn().mockReturnValue(mockUpdatedToken),
            deleteById: jest.fn().mockReturnValue(undefined),
            deleteManyByIds: jest.fn().mockReturnValue(undefined),
          },
        },
      ],
    }).compile();

    tokensController = module.get<TokensController>(TokensController);
    tokensService = module.get<TokensService>(TokensService);
  });

  it('should be defined', () => {
    expect(tokensController).toBeDefined();
    expect(tokensService).toBeDefined();
  });

  describe('create', () => {
    it('should create a new token successfully', async () => {
      const body: CreateTokenDto = {
        id: 'ethereum',
        name: 'Ethereum',
        symbol: 'ETH',
        quantity: 1,
      };

      const createdToken = await tokensController.create(body);

      expect(createdToken).toEqual(mockNewToken);
      expect(tokensService.create).toHaveBeenCalledTimes(1);
      expect(tokensService.create).toHaveBeenCalledWith(body);
    });

    it('should throw an exception', () => {
      const body: CreateTokenDto = {
        id: 'ethereum',
        name: 'Ethereum',
        symbol: 'ETH',
        quantity: 1,
      };

      jest.spyOn(tokensService, 'create').mockRejectedValueOnce(new Error());

      expect(tokensController.create(body)).rejects.toThrowError();
    });
  });

  describe('indexAvailableToken', () => {
    it('should return a list of the saved tokens successfully', async () => {
      const tokenList = await tokensController.indexAvailableToken();

      expect(tokenList).toEqual(mockAvailableTokenList);
      expect(tokensService.findAllAvailable).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest
        .spyOn(tokensService, 'findAllAvailable')
        .mockRejectedValueOnce(new Error());

      expect(tokensController.indexAvailableToken()).rejects.toThrowError();
    });
  });

  describe('indexTokensMarketData', () => {
    it('should return a list of the saved tokens successfully', async () => {
      const body: TokensMarketQueryParams = {
        ids: 'bitcoin,ethereum',
      };

      const tokenList = await tokensController.indexTokensMarketData(body);

      expect(tokenList).toEqual(mockMarketDataTokenList);
      expect(tokensService.findMarketDataByIds).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      const body: TokensMarketQueryParams = {
        ids: 'bitcoin,ethereum',
      };

      jest
        .spyOn(tokensService, 'findMarketDataByIds')
        .mockRejectedValueOnce(new Error());

      expect(
        tokensController.indexTokensMarketData(body),
      ).rejects.toThrowError();
    });
  });

  describe('index', () => {
    it('should return a list of the saved tokens successfully', async () => {
      const tokenList = await tokensController.index();

      expect(tokenList).toEqual(mockTokenList);
      expect(tokensService.findAll).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest.spyOn(tokensService, 'findAll').mockRejectedValueOnce(new Error());

      expect(tokensController.index()).rejects.toThrowError();
    });
  });

  describe('updateQuantityById', () => {
    it('should update a token quantity by its id successfully', async () => {
      const body: UpdateTokenQuantityDto = {
        new_quantity: 2,
      };

      const updatedToken = await tokensController.updateQuantity(
        'ethereum',
        body,
      );

      expect(updatedToken).toEqual(mockUpdatedToken);
      expect(tokensService.updateQuantityById).toHaveBeenCalledTimes(1);
      expect(tokensService.updateQuantityById).toHaveBeenCalledWith(
        'ethereum',
        body,
      );
    });

    it('should throw an exception', () => {
      const body: UpdateTokenQuantityDto = {
        new_quantity: 2,
      };

      jest
        .spyOn(tokensService, 'updateQuantityById')
        .mockRejectedValueOnce(new Error());

      expect(
        tokensController.updateQuantity('ethereum', body),
      ).rejects.toThrowError();
    });
  });

  describe('delete', () => {
    it('should remove a token successfully', async () => {
      const deleteResult = await tokensController.delete('ethereum');

      expect(deleteResult).toBeUndefined();
      expect(tokensService.deleteById).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest
        .spyOn(tokensService, 'deleteById')
        .mockRejectedValueOnce(new Error());

      expect(tokensController.delete('ethereum')).rejects.toThrowError();
    });
  });

  describe('deleteMany', () => {
    it('should remove multiple tokens successfully', async () => {
      const body: DeleteTokensDto = {
        ids: ['ethereum', 'bitcoin'],
      };

      const deleteResult = await tokensController.deleteMany(body);

      expect(deleteResult).toBeUndefined();
      expect(tokensService.deleteManyByIds).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      const body: DeleteTokensDto = {
        ids: ['ethereum', 'bitcoin'],
      };

      jest
        .spyOn(tokensService, 'deleteManyByIds')
        .mockRejectedValueOnce(new Error());

      expect(tokensController.deleteMany(body)).rejects.toThrowError();
    });
  });
});
