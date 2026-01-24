// MIGA Bridge Types - Multi-chain minting integration

export type MPCBackend = 'utila' | 'fireblocks' | 't-chain' | 'threshold-vm' | 'mpc-go';

export interface ChainConfig {
  id: string;
  name: string;
  symbol: string;
  chainId: number | string | null;
  type: 'evm' | 'solana' | 'ton' | 'bitcoin';
  color: string;
  icon: string;
  explorer: string;
  rpc?: string;
  nativeAsset: string;
  decimals: number;
  enabled: boolean;
  depositAddress?: string; // DAO wallet address for this chain
}

export interface DonationAsset {
  symbol: string;
  name: string;
  decimals: number;
  contractAddress?: string;
  logo: string;
  enabled: boolean;
}

export interface DAOWalletConfig {
  name: string;
  backend: MPCBackend;
  signers: number;
  threshold: number;
  addresses: Record<string, string>; // chain -> address
}

export interface DepositRequest {
  fromChain: string;
  toChain: 'LUX_MAINNET';
  asset: string;
  amount: string;
  senderAddress: string;
  receiverAddress: string; // DAO treasury address
}

export interface DepositStatus {
  id: string;
  status: 'pending' | 'confirming' | 'processing' | 'completed' | 'failed';
  txHash?: string;
  fromChain: string;
  toChain: string;
  amount: string;
  asset: string;
  timestamp: number;
  confirmations?: number;
  requiredConfirmations?: number;
}

export interface BridgeQuote {
  fromChain: string;
  toChain: string;
  fromAsset: string;
  toAsset: string;
  fromAmount: string;
  toAmount: string;
  fee: string;
  feeAsset: string;
  estimatedTime: number; // seconds
  route: string[];
}
