// MIGA Protocol - Supported Networks for Donations
// 7 chains: Bitcoin, Ethereum, BNB, Solana, TON, Lux, Zoo

import type { ChainConfig, DAOWalletConfig, DonationAsset } from './types';

// MIGA DAO Treasury configuration - 3-of-5 Utila MPC
export const MIGA_DAO_WALLET: DAOWalletConfig = {
  name: 'MIGA DAO Treasury',
  backend: 'utila',
  signers: 5,
  threshold: 3,
  addresses: {
    // These will be populated with actual DAO wallet addresses
    BITCOIN_MAINNET: '', // Bitcoin P2WSH address
    ETHEREUM_MAINNET: '', // EVM address
    BSC_MAINNET: '', // Same as ETH (EVM compatible)
    SOLANA_MAINNET: '', // Solana address
    TON_MAINNET: '', // TON address
    LUX_MAINNET: '', // Lux address
    ZOO_MAINNET: '', // Zoo address
  }
};

// Supported chains for MIGA donations
export const MIGA_CHAINS: ChainConfig[] = [
  {
    id: 'BITCOIN_MAINNET',
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
    depositAddress: MIGA_DAO_WALLET.addresses.BITCOIN_MAINNET,
  },
  {
    id: 'ETHEREUM_MAINNET',
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
    depositAddress: MIGA_DAO_WALLET.addresses.ETHEREUM_MAINNET,
  },
  {
    id: 'BSC_MAINNET',
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
    depositAddress: MIGA_DAO_WALLET.addresses.BSC_MAINNET,
  },
  {
    id: 'SOLANA_MAINNET',
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
    depositAddress: MIGA_DAO_WALLET.addresses.SOLANA_MAINNET,
  },
  {
    id: 'TON_MAINNET',
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
    depositAddress: MIGA_DAO_WALLET.addresses.TON_MAINNET,
  },
  {
    id: 'LUX_MAINNET',
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
    depositAddress: MIGA_DAO_WALLET.addresses.LUX_MAINNET,
  },
  {
    id: 'ZOO_MAINNET',
    name: 'Zoo',
    symbol: 'ZOO',
    chainId: 200200,
    type: 'evm',
    color: '#8B5CF6',
    icon: '/images/tokens/zoo.png',
    explorer: 'https://explore.zoo.network',
    rpc: 'https://api.zoo.network',
    nativeAsset: 'ZOO',
    decimals: 18,
    enabled: true,
    depositAddress: MIGA_DAO_WALLET.addresses.ZOO_MAINNET,
  },
];

// Supported assets for donation (stablecoins and native tokens)
export const DONATION_ASSETS: Record<string, DonationAsset[]> = {
  BITCOIN_MAINNET: [
    { symbol: 'BTC', name: 'Bitcoin', decimals: 8, logo: '/images/tokens/bitcoin.png', enabled: true },
  ],
  ETHEREUM_MAINNET: [
    { symbol: 'ETH', name: 'Ethereum', decimals: 18, logo: '/images/tokens/ethereum.png', enabled: true },
    { symbol: 'USDC', name: 'USD Coin', decimals: 6, contractAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', logo: '/images/tokens/usdc.png', enabled: true },
    { symbol: 'USDT', name: 'Tether', decimals: 6, contractAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7', logo: '/images/tokens/usdt.png', enabled: true },
    { symbol: 'DAI', name: 'Dai', decimals: 18, contractAddress: '0x6B175474E89094C44Da98b954EescdeCB5A36bEe', logo: '/images/tokens/dai.png', enabled: true },
  ],
  BSC_MAINNET: [
    { symbol: 'BNB', name: 'BNB', decimals: 18, logo: '/images/tokens/bnb.png', enabled: true },
    { symbol: 'USDC', name: 'USD Coin', decimals: 18, contractAddress: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d', logo: '/images/tokens/usdc.png', enabled: true },
    { symbol: 'USDT', name: 'Tether', decimals: 18, contractAddress: '0x55d398326f99059fF775485246999027B3197955', logo: '/images/tokens/usdt.png', enabled: true },
  ],
  SOLANA_MAINNET: [
    { symbol: 'SOL', name: 'Solana', decimals: 9, logo: '/images/tokens/solana.png', enabled: true },
    { symbol: 'USDC', name: 'USD Coin', decimals: 6, contractAddress: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', logo: '/images/tokens/usdc.png', enabled: true },
    { symbol: 'MIGA', name: 'MIGA', decimals: 9, contractAddress: '', logo: '/images/migacoin.png', enabled: true }, // MIGA token address TBD
  ],
  TON_MAINNET: [
    { symbol: 'TON', name: 'TON', decimals: 9, logo: '/images/tokens/ton.png', enabled: true },
    { symbol: 'USDC', name: 'jUSDC', decimals: 6, contractAddress: 'EQB-MPwrd1G6WKNkLz_VnV6WqBDd142KMQv-g1O-8QUA3728', logo: '/images/tokens/usdc.png', enabled: true },
  ],
  LUX_MAINNET: [
    { symbol: 'LUX', name: 'Lux', decimals: 18, logo: '/images/tokens/lux.png', enabled: true },
    { symbol: 'LUSD', name: 'Lux Dollar', decimals: 18, contractAddress: '0x848Cff46eb323f323b6Bbe1Df274E40793d7f2c2', logo: '/images/tokens/lusd.png', enabled: true },
  ],
  ZOO_MAINNET: [
    { symbol: 'ZOO', name: 'Zoo', decimals: 18, logo: '/images/tokens/zoo.png', enabled: true },
    { symbol: 'ZUSD', name: 'Zoo Dollar', decimals: 18, contractAddress: '0x848Cff46eb323f323b6Bbe1Df274E40793d7f2c2', logo: '/images/tokens/zusd.png', enabled: true },
  ],
};

// Get chain by ID
export const getChain = (chainId: string): ChainConfig | undefined => {
  return MIGA_CHAINS.find(c => c.id === chainId);
};

// Get assets for a chain
export const getChainAssets = (chainId: string): DonationAsset[] => {
  return DONATION_ASSETS[chainId] || [];
};

// Get enabled chains
export const getEnabledChains = (): ChainConfig[] => {
  return MIGA_CHAINS.filter(c => c.enabled);
};
