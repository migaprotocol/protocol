// MIGA Bridge API Service
// Connects to lux/bridge backend for deposit tracking and MPC redemption

export interface DepositRecord {
  id: string;
  chain: string;
  asset: string;
  amount: string;
  usdValue: number;
  txHash: string;
  fromAddress: string;
  toAddress: string;
  timestamp: number;
  confirmations: number;
  status: 'pending' | 'confirmed' | 'completed';
}

export interface LeaderboardEntry {
  chain: string;
  symbol: string;
  totalDeposits: number;
  depositCount: number;
  topContributors: Array<{
    address: string;
    amount: number;
    ens?: string;
  }>;
}

export interface SwapResponse {
  id: string;
  depositAddress: string;
  memo?: string;
  status: string;
}

export interface RedemptionProof {
  txId: string;
  chain: string;
  amount: string;
  signature: string;
  mpcSigner: string;
  hashedTxId: string;
}

// API Configuration
const BRIDGE_API_URL = import.meta.env.VITE_BRIDGE_API_URL || 'https://api.bridge.lux.network';
const BRIDGE_API_TIMEOUT = 30000;

class BridgeApiService {
  private baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || BRIDGE_API_URL;
  }

  /**
   * Create a swap/deposit intent
   */
  async createSwap(params: {
    sourceNetwork: string;
    destinationNetwork: string;
    destinationAddress: string;
    amount: string;
  }): Promise<SwapResponse> {
    const response = await this.fetch('/api/swaps', {
      method: 'POST',
      body: JSON.stringify({
        source_network: params.sourceNetwork,
        destination_network: params.destinationNetwork,
        destination_address: params.destinationAddress,
        destination_asset: 'MIGA',
        amount: params.amount,
        use_deposit_address: true,
        use_teleporter: false,
        app_name: 'miga-protocol',
      }),
    });
    return response;
  }

  /**
   * Get swap/deposit status
   */
  async getSwapStatus(swapId: string): Promise<DepositRecord | null> {
    try {
      const response = await this.fetch(`/api/swaps/${swapId}`);
      if (!response) return null;

      return {
        id: response.id,
        chain: response.source_network?.internal_name || 'unknown',
        asset: response.source_asset?.asset || 'unknown',
        amount: response.requested_amount?.toString() || '0',
        usdValue: 0, // Calculate from price
        txHash: response.deposit_actions?.[0]?.transaction_hash || '',
        fromAddress: response.source_address || '',
        toAddress: response.deposit_address || '',
        timestamp: new Date(response.created_date).getTime(),
        confirmations: response.deposit_actions?.[0]?.confirmations || 0,
        status: this.mapSwapStatus(response.status),
      };
    } catch (error) {
      console.error('Failed to get swap status:', error);
      return null;
    }
  }

  /**
   * Check deposit on chain
   */
  async checkDeposit(swapId: string): Promise<boolean> {
    try {
      const response = await this.fetch(`/api/swaps/deposit-check/${swapId}`);
      return response?.detected || false;
    } catch {
      return false;
    }
  }

  /**
   * Get MPC signature for redemption
   */
  async getRedemptionSignature(params: {
    txId: string;
    fromNetworkId: string;
    toNetworkId: string;
    toTokenAddress: string;
    receiverAddressHash: string;
    msgSignature: string;
  }): Promise<RedemptionProof | null> {
    try {
      const response = await this.fetch('/api/swaps/getsig', {
        method: 'POST',
        body: JSON.stringify(params),
      });

      if (!response?.data) return null;

      return {
        txId: params.txId,
        chain: params.fromNetworkId,
        amount: response.data.tokenAmount || '0',
        signature: response.data.signature,
        mpcSigner: response.data.mpcSigner,
        hashedTxId: response.data.hashedTxId,
      };
    } catch (error) {
      console.error('Failed to get redemption signature:', error);
      return null;
    }
  }

  /**
   * Get leaderboard data from all deposits
   */
  async getLeaderboard(): Promise<LeaderboardEntry[]> {
    try {
      // In production, this would fetch from a dedicated leaderboard API
      // For now, we aggregate from swaps
      const response = await this.fetch('/api/swaps?version=mainnet&pageSize=1000');

      if (!response?.data) return [];

      const chainTotals = new Map<string, LeaderboardEntry>();

      for (const swap of response.data) {
        if (swap.status !== 'completed') continue;

        const chain = swap.source_network?.internal_name || 'unknown';
        const existing = chainTotals.get(chain) || {
          chain,
          symbol: swap.source_network?.native_currency || chain.toUpperCase(),
          totalDeposits: 0,
          depositCount: 0,
          topContributors: [],
        };

        existing.totalDeposits += parseFloat(swap.requested_amount || 0);
        existing.depositCount += 1;
        chainTotals.set(chain, existing);
      }

      return Array.from(chainTotals.values())
        .sort((a, b) => b.totalDeposits - a.totalDeposits);
    } catch (error) {
      console.error('Failed to get leaderboard:', error);
      return [];
    }
  }

  /**
   * Get recent deposits
   */
  async getRecentDeposits(limit = 10): Promise<DepositRecord[]> {
    try {
      const response = await this.fetch(`/api/swaps?version=mainnet&pageSize=${limit}`);

      if (!response?.data) return [];

      return response.data.map((swap: any) => ({
        id: swap.id,
        chain: swap.source_network?.internal_name || 'unknown',
        asset: swap.source_asset?.asset || 'unknown',
        amount: swap.requested_amount?.toString() || '0',
        usdValue: 0,
        txHash: swap.deposit_actions?.[0]?.transaction_hash || '',
        fromAddress: swap.source_address || '',
        toAddress: swap.deposit_address || '',
        timestamp: new Date(swap.created_date).getTime(),
        confirmations: swap.deposit_actions?.[0]?.confirmations || 0,
        status: this.mapSwapStatus(swap.status),
      }));
    } catch (error) {
      console.error('Failed to get recent deposits:', error);
      return [];
    }
  }

  /**
   * Get bridge quote
   */
  async getQuote(params: {
    sourceNetwork: string;
    sourceToken: string;
    destinationNetwork: string;
    destinationToken: string;
    amount: string;
  }): Promise<{
    receiveAmount: string;
    fee: string;
    estimatedTime: number;
  } | null> {
    try {
      const query = new URLSearchParams({
        source_network: params.sourceNetwork,
        source_token: params.sourceToken,
        destination_network: params.destinationNetwork,
        destination_token: params.destinationToken,
        amount: params.amount,
      });

      const response = await this.fetch(`/api/quote?${query}`);

      if (!response) return null;

      return {
        receiveAmount: response.receive_amount || params.amount,
        fee: response.total_fee || '0',
        estimatedTime: response.avg_completion_time || 600,
      };
    } catch {
      return null;
    }
  }

  /**
   * Health check
   */
  async healthCheck(): Promise<boolean> {
    try {
      const response = await this.fetch('/health');
      return response?.status === 'ok';
    } catch {
      return false;
    }
  }

  private mapSwapStatus(status: string): 'pending' | 'confirmed' | 'completed' {
    switch (status?.toLowerCase()) {
      case 'completed':
        return 'completed';
      case 'lscompletepending':
      case 'usertransferpending':
      case 'mpcsignpending':
        return 'confirmed';
      default:
        return 'pending';
    }
  }

  private async fetch(path: string, options: RequestInit = {}): Promise<any> {
    const url = `${this.baseUrl}${path}`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), BRIDGE_API_TIMEOUT);

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      clearTimeout(timeout);
      throw error;
    }
  }
}

// Export singleton instance
export const bridgeApi = new BridgeApiService();

// Export class for custom configurations
export { BridgeApiService };
