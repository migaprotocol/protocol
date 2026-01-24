// Chain data - 7 chains for 7 pillars (matches bridge/networks.ts)
// Status: live = accepting deposits, next = coming soon, mystery = vote to decide
// depositAmount: Dynamic value from MPC wallet deposits (in USD equivalent)

export const chainData = [
  {
    name: 'Bitcoin',
    symbol: 'BTC',
    color: '#F7931A', // Orange
    icon: '/images/tokens/bitcoin.png',
    status: 'live',
    mintUrl: '/mint',
    contractAddress: 'bc1q...',
    description: 'Bitcoin mainnet deposits',
    depositAmount: 245000,
  },
  {
    name: 'Ethereum',
    symbol: 'ETH',
    color: '#8C8C8C', // Gray/silver (the diamond)
    icon: '/images/tokens/ethereum.png',
    status: 'live',
    mintUrl: '/mint',
    contractAddress: '0x...',
    description: 'Ethereum mainnet deposits',
    depositAmount: 189000,
  },
  {
    name: 'BNB Chain',
    symbol: 'BNB',
    color: '#F0B90B', // Yellow
    icon: '/images/tokens/bnb.png',
    status: 'live',
    mintUrl: '/mint',
    contractAddress: '0x...',
    description: 'BNB Chain deposits',
    depositAmount: 125000,
  },
  {
    name: 'Solana',
    symbol: 'SOL',
    color: '#9945FF', // Purple
    icon: '/images/tokens/solana.png',
    status: 'live',
    mintUrl: '/mint',
    contractAddress: '...',
    description: 'Solana deposits',
    depositAmount: 98500,
  },
  {
    name: 'TON',
    symbol: 'TON',
    color: '#0098EA', // Blue
    icon: '/images/tokens/ton.png',
    status: 'live',
    mintUrl: '/mint',
    contractAddress: 'UQ...',
    description: 'TON blockchain deposits',
    depositAmount: 67200,
  },
  {
    name: 'Lux',
    symbol: 'LUX',
    color: '#FFFFFF', // White (black & white brand)
    icon: '/images/tokens/lux.png',
    status: 'live',
    mintUrl: '/mint',
    contractAddress: '0x...',
    description: 'Lux Network - native chain',
    depositAmount: 45000,
  },
  {
    name: 'Zoo',
    symbol: 'ZOO',
    color: '#FF00FF', // Magenta (rainbow represented as magenta)
    icon: '/images/tokens/zoo.png',
    status: 'live',
    mintUrl: '/mint',
    contractAddress: '0x...',
    description: 'Zoo Chain deposits',
    depositAmount: 28500,
  },
] as const

export type ChainData = (typeof chainData)[number]

// Deposit address for bridge minting
export const DEPOSIT_ADDRESS = '0x14aa5a41133199c68d06f4dfa5417abb4eef44e9'
