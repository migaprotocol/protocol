// Chain data for 3D scene - 7 pillars for 7 native tokens
// Treasury only holds: BTC, ETH, SOL, BNB, XRP, TON, LUX
// Pillar height scales based on depositAmount (real-time from deposits)

// Deposit address for bridge minting
export const DEPOSIT_ADDRESS = '0x14aa5a41133199c68d06f4dfa5417abb4eef44e9'

export const chainData = [
  {
    name: 'Bitcoin',
    symbol: 'BTC',
    color: '#F7931A',
    icon: '/images/tokens/bitcoin.png',
    status: 'live',
    mintUrl: '/mint/bitcoin',
    depositAddress: '3CUTagummxA2SMFrS2vxGKyLj4gtQ9mrbW',
    description: 'Bitcoin mainnet',
    depositAmount: 0,
  },
  {
    name: 'Ethereum',
    symbol: 'ETH',
    color: '#627EEA',
    icon: '/images/tokens/ethereum.png',
    status: 'live',
    mintUrl: '/mint/ethereum',
    depositAddress: '0xC8C581EDeB8d739F1Daf2D508C3B9CB4e0E051eF',
    description: 'ETH mainnet + L2s',
    depositAmount: 0,
  },
  {
    name: 'Solana',
    symbol: 'SOL',
    color: '#9945FF',
    icon: '/images/tokens/solana.png',
    status: 'live',
    mintUrl: '/mint/solana',
    depositAddress: '3CQYt4bCfGNyetaE3z6i3xv3RVirYqak9KtkpMJeii6M',
    description: 'Solana (min 0.05 SOL)',
    depositAmount: 0,
  },
  {
    name: 'BNB',
    symbol: 'BNB',
    color: '#F0B90B',
    icon: '/images/tokens/bnb.png',
    status: 'live',
    mintUrl: '/mint/bnb',
    depositAddress: '0xAaf3a7253c73a58f2713f454717C5338c6573d62',
    description: 'BNB Chain',
    depositAmount: 0,
  },
  {
    name: 'XRP',
    symbol: 'XRP',
    color: '#23292F',
    icon: '/images/tokens/xrp.png',
    status: 'live',
    mintUrl: '/mint/xrp',
    depositAddress: 'rw2ciyaNshpHe7bCHo4bRWq6pqqynnWKQg',
    memo: '423635759',
    description: 'XRP Ledger (memo required)',
    depositAmount: 0,
  },
  {
    name: 'TON',
    symbol: 'TON',
    color: '#0088CC',
    icon: '/images/tokens/ton.png',
    status: 'live',
    mintUrl: '/mint/ton',
    depositAddress: 'UQCZ80nkghS87gE1AR8bYI_5m5CSNhUxL5gXgXQllJboukzl',
    description: 'TON',
    depositAmount: 0,
  },
  {
    name: 'Lux',
    symbol: 'LUX',
    color: '#C9A227',
    icon: '/images/tokens/lux.png',
    status: 'live',
    mintUrl: '/mint/lux',
    depositAddress: '0x14542918a9032248ef30d9bc1d57983691e3ade4',
    description: 'Pars Network',
    depositAmount: 0,
  },
] as const

export type ChainData = (typeof chainData)[number]
