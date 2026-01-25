// React hooks for Bridge API integration
import { useState, useEffect, useCallback } from 'react';
import { bridgeApi, type DepositRecord, type LeaderboardEntry } from '@/services/bridgeApi';

// Mock data for development when backend is unavailable
const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { chain: 'SOLANA', symbol: 'SOL', totalDeposits: 0, depositCount: 0, topContributors: [] },
  { chain: 'ETHEREUM', symbol: 'ETH', totalDeposits: 0, depositCount: 0, topContributors: [] },
  { chain: 'BITCOIN', symbol: 'BTC', totalDeposits: 0, depositCount: 0, topContributors: [] },
  { chain: 'BSC', symbol: 'BNB', totalDeposits: 0, depositCount: 0, topContributors: [] },
  { chain: 'XRP', symbol: 'XRP', totalDeposits: 0, depositCount: 0, topContributors: [] },
  { chain: 'TON', symbol: 'TON', totalDeposits: 0, depositCount: 0, topContributors: [] },
  { chain: 'LUX', symbol: 'LUX', totalDeposits: 0, depositCount: 0, topContributors: [] },
];

interface UseBridgeApiOptions {
  pollInterval?: number; // ms
  useMock?: boolean;
}

/**
 * Hook for fetching leaderboard data
 */
export function useLeaderboard(options: UseBridgeApiOptions = {}) {
  const { pollInterval = 30000, useMock = false } = options;
  const [data, setData] = useState<LeaderboardEntry[]>(MOCK_LEADERBOARD);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchLeaderboard = useCallback(async () => {
    if (useMock) {
      setData(MOCK_LEADERBOARD);
      setLoading(false);
      return;
    }

    try {
      const leaderboard = await bridgeApi.getLeaderboard();
      if (leaderboard.length > 0) {
        setData(leaderboard);
      }
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch leaderboard'));
      // Keep existing data on error
    } finally {
      setLoading(false);
    }
  }, [useMock]);

  useEffect(() => {
    fetchLeaderboard();

    if (pollInterval > 0 && !useMock) {
      const interval = setInterval(fetchLeaderboard, pollInterval);
      return () => clearInterval(interval);
    }
  }, [fetchLeaderboard, pollInterval, useMock]);

  return { data, loading, error, refetch: fetchLeaderboard };
}

/**
 * Hook for fetching recent deposits
 */
export function useRecentDeposits(limit = 10, options: UseBridgeApiOptions = {}) {
  const { pollInterval = 30000, useMock = false } = options;
  const [data, setData] = useState<DepositRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchDeposits = useCallback(async () => {
    if (useMock) {
      setData([]);
      setLoading(false);
      return;
    }

    try {
      const deposits = await bridgeApi.getRecentDeposits(limit);
      setData(deposits);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch deposits'));
    } finally {
      setLoading(false);
    }
  }, [limit, useMock]);

  useEffect(() => {
    fetchDeposits();

    if (pollInterval > 0 && !useMock) {
      const interval = setInterval(fetchDeposits, pollInterval);
      return () => clearInterval(interval);
    }
  }, [fetchDeposits, pollInterval, useMock]);

  return { data, loading, error, refetch: fetchDeposits };
}

/**
 * Hook for tracking a specific swap/deposit
 */
export function useSwapStatus(swapId: string | null) {
  const [data, setData] = useState<DepositRecord | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchStatus = useCallback(async () => {
    if (!swapId) {
      setData(null);
      return;
    }

    setLoading(true);
    try {
      const status = await bridgeApi.getSwapStatus(swapId);
      setData(status);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch swap status'));
    } finally {
      setLoading(false);
    }
  }, [swapId]);

  useEffect(() => {
    fetchStatus();

    // Poll for status updates
    if (swapId) {
      const interval = setInterval(fetchStatus, 10000);
      return () => clearInterval(interval);
    }
  }, [fetchStatus, swapId]);

  return { data, loading, error, refetch: fetchStatus };
}

/**
 * Hook for creating a new swap
 */
export function useCreateSwap() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createSwap = useCallback(async (params: {
    sourceNetwork: string;
    destinationNetwork: string;
    destinationAddress: string;
    amount: string;
  }) => {
    setLoading(true);
    setError(null);

    try {
      const result = await bridgeApi.createSwap(params);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to create swap');
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return { createSwap, loading, error };
}

/**
 * Hook for getting redemption signature
 */
export function useRedemption() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const getRedemptionProof = useCallback(async (params: {
    txId: string;
    fromNetworkId: string;
    toNetworkId: string;
    toTokenAddress: string;
    receiverAddressHash: string;
    msgSignature: string;
  }) => {
    setLoading(true);
    setError(null);

    try {
      const proof = await bridgeApi.getRedemptionSignature(params);
      return proof;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to get redemption proof');
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return { getRedemptionProof, loading, error };
}

/**
 * Hook for checking bridge API health
 */
export function useBridgeHealth() {
  const [isHealthy, setIsHealthy] = useState<boolean | null>(null);
  const [lastCheck, setLastCheck] = useState<Date | null>(null);

  const checkHealth = useCallback(async () => {
    const healthy = await bridgeApi.healthCheck();
    setIsHealthy(healthy);
    setLastCheck(new Date());
    return healthy;
  }, []);

  useEffect(() => {
    checkHealth();
    const interval = setInterval(checkHealth, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [checkHealth]);

  return { isHealthy, lastCheck, checkHealth };
}
