import { Token } from '../entities/token.entity';

export const mockNewToken = new Token({
  id: 'ethereum',
  name: 'Ethereum',
  symbol: 'ETH',
  quantity: 1,
});

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
