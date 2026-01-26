// MIGA Protocol - Supported Networks for Minting
// 7 native chains: BTC, ETH, SOL, BNB, XRP, TON, LUX
// Stablecoins (USDC/USDT) accepted but auto-swapped to native tokens
// MIGA redeemable on: PARS, HANZO networks

import type { ChainConfig, DAOWalletConfig, DonationAsset } from './types';

// Environment detection
const IS_DEV = import.meta.env.DEV;
const USE_LOCAL = import.meta.env.VITE_USE_LOCAL_NETWORK === 'true';

// Deposit addresses by chain
const DEPOSIT_ADDRESSES = {
  BITCOIN: 'bc1qem8jywyuc9wtgf7y5n9tyq6tknpj3l85tzg9y6',
  EVM: '0xAaf3a7253c73a58f2713f454717C5338c6573d62', // ETH, Base, Optimism, Arbitrum, BSC
  SOLANA: 'BPTZhkTdRwqnrb7PnWvi6SkCWQHcvUZrfaYvPkZ2YD8R',
  XRP: 'raBQUYdAhnnojJQ6Xi3eXztZ74ot24RDq1',
  XRP_MEMO: '3943970694',
  TON: 'UQCx0_0l9AxIouVBxThCRAwO7Yrz6rpQGI-1CS7h-lwjqRTW',
  TON_MEMO: 'GEMGW3X626VA3',
  LUX: '0x14542918a9032248ef30d9bc1d57983691e3ade4',
  PARS: '0x0000000000000000000000000000000000000000', // TBD - deploy to Pars Network
  SPC: '0x0000000000000000000000000000000000000000', // TBD - deploy to Sparkle Pony Chain
  HANZO: '0x0000000000000000000000000000000000000000', // TBD - deploy to Hanzo Network
  LOCAL: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', // Anvil default account
};

// MIGA DAO Treasury configuration - 3-of-5 Utila MPC
// Treasury only holds 7 native tokens: BTC, ETH, SOL, BNB, XRP, TON, LUX
export const MIGA_DAO_WALLET: DAOWalletConfig = {
  name: 'MIGA DAO Treasury',
  backend: 'utila',
  signers: 5,
  threshold: 3,
  addresses: {
    BITCOIN: DEPOSIT_ADDRESSES.BITCOIN,
    ETHEREUM: DEPOSIT_ADDRESSES.EVM,
    BASE: DEPOSIT_ADDRESSES.EVM,
    OPTIMISM: DEPOSIT_ADDRESSES.EVM,
    ARBITRUM: DEPOSIT_ADDRESSES.EVM,
    BSC: DEPOSIT_ADDRESSES.EVM,
    SOLANA: DEPOSIT_ADDRESSES.SOLANA,
    XRP: DEPOSIT_ADDRESSES.XRP,
    TON: DEPOSIT_ADDRESSES.TON,
    LUX: DEPOSIT_ADDRESSES.LUX,
  }
};

// Supported chains for MIGA minting
export const MIGA_CHAINS: ChainConfig[] = [
  {
    id: 'BITCOIN',
    name: 'Bitcoin',
    symbol: 'BTC',
    chainId: null,
    type: 'bitcoin',
    color: '#F7931A',
    icon: '/images/tokens/bitcoin.png',
    explorer: 'https://btcscan.org',
    nativeAsset: 'BTC',
    decimals: 8,
    enabled: true,
    depositAddress: DEPOSIT_ADDRESSES.BITCOIN,
  },
  {
    id: 'ETHEREUM',
    name: 'Ethereum',
    symbol: 'ETH',
    chainId: 1,
    type: 'evm',
    color: '#627EEA',
    icon: '/images/tokens/ethereum.png',
    explorer: 'https://etherscan.io',
    rpc: 'https://eth.llamarpc.com',
    nativeAsset: 'ETH',
    decimals: 18,
    enabled: true,
    depositAddress: DEPOSIT_ADDRESSES.EVM,
  },
  {
    id: 'BASE',
    name: 'Base',
    symbol: 'ETH',
    chainId: 8453,
    type: 'evm',
    color: '#0052FF',
    icon: '/images/tokens/base.png',
    explorer: 'https://basescan.org',
    rpc: 'https://mainnet.base.org',
    nativeAsset: 'ETH',
    decimals: 18,
    enabled: true,
    depositAddress: DEPOSIT_ADDRESSES.EVM,
  },
  {
    id: 'OPTIMISM',
    name: 'Optimism',
    symbol: 'ETH',
    chainId: 10,
    type: 'evm',
    color: '#FF0420',
    icon: '/images/tokens/optimism.png',
    explorer: 'https://optimistic.etherscan.io',
    rpc: 'https://mainnet.optimism.io',
    nativeAsset: 'ETH',
    decimals: 18,
    enabled: true,
    depositAddress: DEPOSIT_ADDRESSES.EVM,
  },
  {
    id: 'ARBITRUM',
    name: 'Arbitrum',
    symbol: 'ETH',
    chainId: 42161,
    type: 'evm',
    color: '#28A0F0',
    icon: '/images/tokens/arbitrum.png',
    explorer: 'https://arbiscan.io',
    rpc: 'https://arb1.arbitrum.io/rpc',
    nativeAsset: 'ETH',
    decimals: 18,
    enabled: true,
    depositAddress: DEPOSIT_ADDRESSES.EVM,
  },
  {
    id: 'BSC',
    name: 'BNB Chain',
    symbol: 'BNB',
    chainId: 56,
    type: 'evm',
    color: '#F0B90B',
    icon: '/images/tokens/bnb.png',
    explorer: 'https://bscscan.com',
    rpc: 'https://bsc-dataseed.binance.org',
    nativeAsset: 'BNB',
    decimals: 18,
    enabled: true,
    depositAddress: DEPOSIT_ADDRESSES.EVM,
  },
  {
    id: 'SOLANA',
    name: 'Solana',
    symbol: 'SOL',
    chainId: null,
    type: 'solana',
    color: '#9945FF',
    icon: '/images/tokens/solana.png',
    explorer: 'https://explorer.solana.com',
    rpc: 'https://api.mainnet-beta.solana.com',
    nativeAsset: 'SOL',
    decimals: 9,
    enabled: true,
    depositAddress: DEPOSIT_ADDRESSES.SOLANA,
    minAmount: 0.05,
  },
  {
    id: 'XRP',
    name: 'XRP Ledger',
    symbol: 'XRP',
    chainId: null,
    type: 'xrp',
    color: '#23292F',
    icon: '/images/tokens/xrp.png',
    explorer: 'https://xrpscan.com',
    nativeAsset: 'XRP',
    decimals: 6,
    enabled: true,
    depositAddress: DEPOSIT_ADDRESSES.XRP,
    memo: DEPOSIT_ADDRESSES.XRP_MEMO,
  },
  {
    id: 'TON',
    name: 'TON',
    symbol: 'TON',
    chainId: -239,
    type: 'ton',
    color: '#0088CC',
    icon: '/images/tokens/ton.png',
    explorer: 'https://tonscan.org',
    nativeAsset: 'TON',
    decimals: 9,
    enabled: true,
    depositAddress: DEPOSIT_ADDRESSES.TON,
    memo: DEPOSIT_ADDRESSES.TON_MEMO,
  },
  {
    id: 'LUX',
    name: 'Lux',
    symbol: 'LUX',
    chainId: 96369,
    type: 'evm',
    color: '#C9A227',
    icon: '/images/tokens/lux.png',
    explorer: 'https://explore.lux.network',
    rpc: 'https://api.lux.network',
    nativeAsset: 'LUX',
    decimals: 18,
    enabled: true,
    depositAddress: DEPOSIT_ADDRESSES.LUX,
  },
  // === MIGA Redemption Networks ===
  {
    id: 'PARS',
    name: 'Pars Network',
    symbol: 'PARS',
    chainId: 494949,
    type: 'evm',
    color: '#E6B800',
    icon: '/images/tokens/pars.png',
    explorer: 'https://explore.pars.network',
    rpc: 'https://rpc.pars.network',
    nativeAsset: 'PARS',
    decimals: 18,
    enabled: true,
    depositAddress: DEPOSIT_ADDRESSES.PARS,
    isRedemptionNetwork: true,
  },
  {
    id: 'SPC',
    name: 'Sparkle Pony',
    symbol: 'SPC',
    chainId: 36911, // Sparkle Pony Chain
    type: 'evm',
    color: '#FF69B4',
    icon: '/images/tokens/spc.png',
    explorer: 'https://explore.sparklepony.xyz',
    rpc: 'https://rpc.sparklepony.xyz',
    nativeAsset: 'SPC',
    decimals: 18,
    enabled: true,
    depositAddress: DEPOSIT_ADDRESSES.SPC,
    isRedemptionNetwork: true,
  },
  {
    id: 'HANZO',
    name: 'Hanzo Network',
    symbol: 'AI',
    chainId: 36963,
    type: 'evm',
    color: '#00D4FF',
    icon: '/images/tokens/hanzo.png',
    explorer: 'https://explore.hanzo.ai',
    rpc: 'https://rpc.hanzo.ai',
    nativeAsset: 'AI',
    decimals: 18,
    enabled: false, // Enable when deployed
    depositAddress: DEPOSIT_ADDRESSES.HANZO,
    isRedemptionNetwork: true,
  },
  // Local development network (Anvil)
  ...(USE_LOCAL ? [{
    id: 'LOCAL',
    name: 'Local Dev',
    symbol: 'ETH',
    chainId: 31337,
    type: 'evm' as const,
    color: '#888888',
    icon: '/images/tokens/ethereum.png',
    explorer: '',
    rpc: 'http://127.0.0.1:8545',
    nativeAsset: 'ETH',
    decimals: 18,
    enabled: true,
    depositAddress: DEPOSIT_ADDRESSES.LOCAL,
    isDev: true,
  }] : []),
];

// Supported assets for minting
// IMPORTANT: Stablecoins (USDC/USDT) are auto-swapped to native tokens
// Treasury only holds: BTC, ETH, SOL, BNB, XRP, TON, LUX
export const MINT_ASSETS: Record<string, DonationAsset[]> = {
  BITCOIN: [
    { symbol: 'BTC', name: 'Bitcoin', decimals: 8, logo: '/images/tokens/bitcoin.png', enabled: true },
  ],
  ETHEREUM: [
    { symbol: 'ETH', name: 'Ethereum', decimals: 18, logo: '/images/tokens/ethereum.png', enabled: true },
    { symbol: 'USDC', name: 'USD Coin → ETH', decimals: 6, contractAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', logo: '/images/tokens/usdc.png', enabled: true },
    { symbol: 'USDT', name: 'Tether → ETH', decimals: 6, contractAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7', logo: '/images/tokens/usdt.png', enabled: true },
  ],
  BASE: [
    { symbol: 'ETH', name: 'Ethereum', decimals: 18, logo: '/images/tokens/ethereum.png', enabled: true },
    { symbol: 'USDC', name: 'USD Coin → ETH', decimals: 6, contractAddress: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913', logo: '/images/tokens/usdc.png', enabled: true },
  ],
  OPTIMISM: [
    { symbol: 'ETH', name: 'Ethereum', decimals: 18, logo: '/images/tokens/ethereum.png', enabled: true },
    { symbol: 'USDC', name: 'USD Coin → ETH', decimals: 6, contractAddress: '0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85', logo: '/images/tokens/usdc.png', enabled: true },
  ],
  ARBITRUM: [
    { symbol: 'ETH', name: 'Ethereum', decimals: 18, logo: '/images/tokens/ethereum.png', enabled: true },
    { symbol: 'USDC', name: 'USD Coin → ETH', decimals: 6, contractAddress: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831', logo: '/images/tokens/usdc.png', enabled: true },
  ],
  BSC: [
    { symbol: 'BNB', name: 'BNB', decimals: 18, logo: '/images/tokens/bnb.png', enabled: true },
  ],
  SOLANA: [
    { symbol: 'SOL', name: 'Solana', decimals: 9, logo: '/images/tokens/solana.png', enabled: true, minAmount: 0.05 },
    { symbol: 'USDC', name: 'USD Coin → SOL', decimals: 6, contractAddress: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', logo: '/images/tokens/usdc.png', enabled: true },
    { symbol: 'USDT', name: 'Tether → SOL', decimals: 6, contractAddress: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB', logo: '/images/tokens/usdt.png', enabled: true },
  ],
  XRP: [
    { symbol: 'XRP', name: 'XRP', decimals: 6, logo: '/images/tokens/xrp.png', enabled: true },
  ],
  TON: [
    { symbol: 'TON', name: 'TON', decimals: 9, logo: '/images/tokens/ton.png', enabled: true },
  ],
  LUX: [
    { symbol: 'LUX', name: 'Lux', decimals: 18, logo: '/images/tokens/lux.png', enabled: true },
  ],
};

// Get chain by ID
export const getChain = (chainId: string): ChainConfig | undefined => {
  return MIGA_CHAINS.find(c => c.id === chainId);
};

// Get assets for a chain
export const getChainAssets = (chainId: string): DonationAsset[] => {
  return MINT_ASSETS[chainId] || [];
};

// Get enabled chains
export const getEnabledChains = (): ChainConfig[] => {
  return MIGA_CHAINS.filter(c => c.enabled);
};
