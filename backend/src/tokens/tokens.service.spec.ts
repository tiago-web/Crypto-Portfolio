import { Test, TestingModule } from '@nestjs/testing';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenQuantityDto } from './dto/update-token-quantity.dto';
import {
  mockFoundToken,
  mockNewToken,
  mockTokenList,
  mockUpdatedToken,
} from './mocks';
import { TokensService } from './tokens.service';

describe('TokensService', () => {
  let tokensService: TokensService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: TokensService,
          useValue: {
            create: jest.fn().mockReturnValue(mockNewToken),
            findById: jest.fn().mockReturnValue(mockFoundToken),
            findAll: jest.fn().mockReturnValue(mockTokenList),
            updateQuantityById: jest.fn().mockReturnValue(mockUpdatedToken),
            deleteById: jest.fn().mockReturnValue(undefined),
          },
        },
      ],
    }).compile();

    tokensService = module.get<TokensService>(TokensService);
  });

  it('should be defined', () => {
    expect(tokensService).toBeDefined();
  });

  describe('create', () => {
    it('should create a new token', async () => {
      const body: CreateTokenDto = {
        id: 'ethereum',
        name: 'Ethereum',
        symbol: 'ETH',
        quantity: 1,
      };

      const createdToken = await tokensService.create(body);

      const foundToken = await tokensService.findById(body.id);

      expect(createdToken).toEqual(mockNewToken);
      expect(tokensService.create).toHaveBeenCalledTimes(1);

      expect(foundToken).toEqual(mockFoundToken);
      expect(tokensService.findById).toHaveBeenCalledTimes(1);
    });
  });

  describe('findById', () => {
    it('should find a token by itsid', async () => {
      const body: CreateTokenDto = {
        id: 'ethereum',
        name: 'Ethereum',
        symbol: 'ETH',
        quantity: 1,
      };
      await tokensService.create(body);
      const foundToken = await tokensService.findById(body.id);

      expect(foundToken).toEqual(mockFoundToken);
      expect(tokensService.findById).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAll', () => {
    it('should find all tokens saved', async () => {
      const tokenList = await tokensService.findAll();

      expect(tokenList).toEqual(mockTokenList);
      expect(tokensService.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateQuantityById', () => {
    it('should update a token quantity by its id successfully', async () => {
      const body: UpdateTokenQuantityDto = {
        new_quantity: 2,
      };

      const updatedToken = await tokensService.updateQuantityById(
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
  });

  describe('deleteById', () => {
    it('delete a token by its id', async () => {
      const deleteResult = await tokensService.deleteById('ethereum');

      expect(deleteResult).toBeUndefined();
      expect(tokensService.deleteById).toHaveBeenCalledTimes(1);
    });
  });
});
