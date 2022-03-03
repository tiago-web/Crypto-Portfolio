import { Token } from '../entities/token.entity';
import { IAvailableToken } from '../interfaces/available-token.interface';
import { ITokenMarketData } from '../interfaces/token-market-data.interface';

export const mockNewToken = new Token({
  id: 'ethereum',
  name: 'Ethereum',
  symbol: 'ETH',
  quantity: 1,
});

export const mockAvailableTokenList: IAvailableToken[] = [
  { id: 'ethereum', name: 'Ethereum', symbol: 'ETH' },
  { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC' },
];

export const mockMarketDataTokenList: ITokenMarketData[] = [
  {
    id: 'bitcoin',
    symbol: 'BTC',
    name: 'Bitcoin',
    current_price: 42496,
  },
  {
    id: 'ethereum',
    symbol: 'ETH',
    name: 'Ethereum',
    current_price: 2827.96,
  },
];

export const mockTokenList: Token[] = [
  new Token({ id: 'ethereum', name: 'Ethereum', symbol: 'ETH', quantity: 1 }),
  new Token({ id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', quantity: 0.3 }),
];

export const mockUpdatedToken = new Token({
  id: 'ethereum',
  name: 'Ethereum',
  symbol: 'ETH',
  quantity: 2,
});

export const mockFoundToken = new Token({
  id: 'ethereum',
  name: 'Ethereum',
  symbol: 'ETH',
  quantity: 1,
});
