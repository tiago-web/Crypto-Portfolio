import { Test, TestingModule } from '@nestjs/testing';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenQuantityDto } from './dto/update-token-quantity.dto';
import { Token } from './entities/token.entity';
import { TokensController } from './tokens.controller';
import { TokensService } from './tokens.service';

const mockNewToken = new Token({
  id: 'ethereum',
  name: 'Ethereum',
  symbol: 'ETH',
  quantity: 1,
});

const mockTokenList: Token[] = [
  new Token({ id: 'ethereum', name: 'Ethereum', symbol: 'ETH', quantity: 1 }),
  new Token({ id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', quantity: 0.3 }),
];

const mockUpdatedToken = new Token({
  id: 'ethereum',
  name: 'Ethereum',
  symbol: 'ETH',
  quantity: 2,
});

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
            findAll: jest.fn().mockReturnValue(mockTokenList),
            updateQuantityById: jest.fn().mockReturnValue(mockUpdatedToken),
            deleteById: jest.fn().mockReturnValue(undefined),
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
      // Arrange
      const body: CreateTokenDto = {
        id: 'ethereum',
        name: 'Ethereum',
        symbol: 'ETH',
        quantity: 1,
      };

      // Act
      const result = await tokensController.create(body);

      // Assert
      expect(result).toEqual(mockNewToken);
      expect(tokensService.create).toHaveBeenCalledTimes(1);
      expect(tokensService.create).toHaveBeenCalledWith(body);
    });

    it('should throw an exception', () => {
      // Arrange
      const body: CreateTokenDto = {
        id: 'ethereum',
        name: 'Ethereum',
        symbol: 'ETH',
        quantity: 1,
      };

      jest.spyOn(tokensService, 'create').mockRejectedValueOnce(new Error());

      // Assert
      expect(tokensController.create(body)).rejects.toThrowError();
    });
  });

  describe('index', () => {
    it('should return a list of the saved tokens successfully', async () => {
      // Act
      const result = await tokensController.index();

      // Assert
      expect(result).toEqual(mockTokenList);
      expect(tokensService.findAll).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      // Arrange
      jest.spyOn(tokensService, 'findAll').mockRejectedValueOnce(new Error());

      // Assert
      expect(tokensController.index()).rejects.toThrowError();
    });
  });

  describe('updateQuantityById', () => {
    it('should update a token quantity by its id successfully', async () => {
      // Arrange
      const body: UpdateTokenQuantityDto = {
        new_quantity: 2,
      };

      // Act
      const result = await tokensController.updateQuantity('ethereum', body);

      // Assert
      expect(result).toEqual(mockUpdatedToken);
      expect(tokensService.updateQuantityById).toHaveBeenCalledTimes(1);
      expect(tokensService.updateQuantityById).toHaveBeenCalledWith(
        'ethereum',
        body,
      );
    });

    it('should throw an exception', () => {
      // Arrange
      const body: UpdateTokenQuantityDto = {
        new_quantity: 2,
      };

      jest
        .spyOn(tokensService, 'updateQuantityById')
        .mockRejectedValueOnce(new Error());

      // Assert
      expect(
        tokensController.updateQuantity('ethereum', body),
      ).rejects.toThrowError();
    });
  });

  describe('delete', () => {
    it('should remove a token successfully', async () => {
      // Act
      const result = await tokensController.delete('ethereum');

      // Assert
      expect(result).toBeUndefined();
      expect(tokensService.deleteById).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      // Arrange
      jest
        .spyOn(tokensService, 'deleteById')
        .mockRejectedValueOnce(new Error());

      // Assert
      expect(tokensController.delete('ethereum')).rejects.toThrowError();
    });
  });
});
