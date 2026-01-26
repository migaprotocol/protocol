// pars.id Identity Service
// Integrates with Hanzo Identity contracts for EVM-based DID minting
// Supports coercion-resistant features from PIP-0003

import { keccak256, toBytes, encodeFunctionData } from 'viem';

// Contract addresses by chain
const IDENTITY_CONTRACTS = {
  // Pars Network (494949) - pars.network
  494949: {
    registry: '', // TBD - will be deployed
    nft: '',
    token: '',
  },
  // Sparkle Pony Chain (36911) - sparklepony.xyz
  // DID methods: did:sparkle, did:spc, did:sparklepony
  36911: {
    registry: '', // TBD - will be deployed
    nft: '',
    token: '',
  },
  // Lux Mainnet
  96369: {
    registry: '', // TBD
    nft: '',
    token: '',
  },
  // Hanzo Network (AI chain)
  36963: {
    registry: '', // TBD - deploy with DeployFullIdentitySystem.s.sol
    nft: '',
    token: '',
  },
  // Pars Testnet (local)
  96370: {
    registry: '0x0d0efcd9442fed398e93436179426e3ac5e33d0e', // MigaToken found
    nft: '',
    token: '0x0d0efcd9442fed398e93436179426e3ac5e33d0e',
  },
  // Localhost (Anvil) - from hanzo/ui/app/lib/contracts.ts
  31337: {
    registry: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
    nft: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
    token: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
  },
  // Zoo Mainnet
  200200: {
    registry: '', // TBD
    nft: '',
    token: '',
  },
} as const;

// Identity data structure (matches HanzoRegistry.sol)
export interface IdentityData {
  boundNft: bigint;
  stakedTokens: bigint;
  encryptionKey: string;
  signatureKey: string;
  routing: boolean;
  addressOrProxyNodes: string[];
  delegatedTokens: bigint;
  lastUpdated: bigint;
}

export interface ClaimIdentityParams {
  name: string;
  namespace: bigint;
  stakeAmount: bigint;
  owner: `0x${string}`;
  referrer: string;
}

export interface SetDataParams {
  encryptionKey: string;
  signatureKey: string;
  routing: boolean;
  addressOrProxyNodes: string[];
}

// Duress protection - encrypted with different keys
export interface DuressConfig {
  normalPasswordHash: string;
  duressPasswordHash: string;
  decoyData: IdentityData;
  deadManSwitchDays: number;
  lastCheckIn: number;
}

// Generate anonymous identifier from entropy
export function generateAnonId(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return keccak256(array);
}

// Hash password with salt for local storage
export function hashPassword(password: string, salt: string): string {
  return keccak256(toBytes(`${password}:${salt}`));
}

// Calculate stake requirement based on name length
export function calculateStakeRequirement(nameLength: number, hasReferrer: boolean): bigint {
  let basePrice: bigint;

  if (nameLength === 1) {
    basePrice = BigInt('100000000000000000000000'); // 100,000 tokens
  } else if (nameLength === 2) {
    basePrice = BigInt('10000000000000000000000');  // 10,000 tokens
  } else if (nameLength === 3) {
    basePrice = BigInt('1000000000000000000000');   // 1,000 tokens
  } else if (nameLength === 4) {
    basePrice = BigInt('100000000000000000000');    // 100 tokens
  } else {
    basePrice = BigInt('10000000000000000000');     // 10 tokens
  }

  // 50% discount with referrer
  return hasReferrer ? basePrice / BigInt(2) : basePrice;
}

// Format identity string (legacy @name.namespace format)
export function formatIdentity(name: string, chainId: number): string {
  const namespace = getNamespaceForChain(chainId);
  return namespace ? `@${name}.${namespace}` : `@${name}`;
}

// Format W3C DID string
export function formatDID(address: string, chainId: number): string {
  const method = getDIDMethodForChain(chainId);
  return `did:${method}:${address.toLowerCase()}`;
}

// Get DID method for chain
// Sparkle Pony reserves: did:sparkle, did:spc, did:sparklepony
export function getDIDMethodForChain(chainId: number): string {
  switch (chainId) {
    case 494949: return 'pars';      // Pars Network
    case 36911: return 'sparkle';    // Sparkle Pony Chain (also: spc, sparklepony)
    case 36963: return 'ai';         // Hanzo Network (AI chain)
    case 96369: return 'lux';        // Lux Network
    case 200200: return 'zoo';       // Zoo Network
    case 96370: return 'pars';       // Pars testnet
    case 36910: return 'sparkle';    // Sparkle Pony testnet
    case 36962: return 'ai';         // Hanzo testnet
    case 96368: return 'lux';        // Lux testnet
    case 200201: return 'zoo';       // Zoo testnet
    case 31337: return 'dev';        // Local development
    default: return `chain${chainId}`;
  }
}

// Get all valid DID methods for a chain (including aliases)
export function getDIDMethodsForChain(chainId: number): string[] {
  switch (chainId) {
    case 36911: return ['sparkle', 'spc', 'sparklepony']; // SPC reserves all three
    case 494949: return ['pars'];
    case 36963: return ['ai', 'hanzo'];
    case 96369: return ['lux'];
    case 200200: return ['zoo'];
    default: return [getDIDMethodForChain(chainId)];
  }
}

// Get namespace for chain
export function getNamespaceForChain(chainId: number): string {
  switch (chainId) {
    case 494949: return 'pars'; // Pars Network (pars.network / sparklepony.xyz)
    case 96369: return 'lux';
    case 200200: return 'zoo';
    case 36963: return 'hanzo'; // Hanzo Network (AI chain)
    case 96370: return 'pars-test'; // Pars testnet
    case 31337: return 'localhost';
    default: return `chain${chainId}`;
  }
}

// Registry ABI (subset for claiming)
export const REGISTRY_ABI = [
  {
    name: 'claimIdentity',
    type: 'function',
    inputs: [{
      name: 'params',
      type: 'tuple',
      components: [
        { name: 'name', type: 'string' },
        { name: 'namespace', type: 'uint256' },
        { name: 'stakeAmount', type: 'uint256' },
        { name: 'owner', type: 'address' },
        { name: 'referrer', type: 'string' },
      ],
    }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    name: 'identityStakeRequirement',
    type: 'function',
    inputs: [
      { name: 'name', type: 'string' },
      { name: 'namespace', type: 'uint256' },
      { name: 'hasReferrer', type: 'bool' },
    ],
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    name: 'ownerOf',
    type: 'function',
    inputs: [{ name: 'identity', type: 'string' }],
    outputs: [{ type: 'address' }],
    stateMutability: 'view',
  },
  {
    name: 'getIdentityData',
    type: 'function',
    inputs: [{ name: 'identity', type: 'string' }],
    outputs: [{
      name: 'data',
      type: 'tuple',
      components: [
        { name: 'boundNft', type: 'uint256' },
        { name: 'stakedTokens', type: 'uint256' },
        { name: 'encryptionKey', type: 'string' },
        { name: 'signatureKey', type: 'string' },
        { name: 'routing', type: 'bool' },
        { name: 'addressOrProxyNodes', type: 'string[]' },
        { name: 'delegatedTokens', type: 'uint256' },
        { name: 'lastUpdated', type: 'uint256' },
      ],
    }],
    stateMutability: 'view',
  },
  {
    name: 'setData',
    type: 'function',
    inputs: [
      { name: 'identity', type: 'string' },
      {
        name: 'params',
        type: 'tuple',
        components: [
          { name: 'encryptionKey', type: 'string' },
          { name: 'signatureKey', type: 'string' },
          { name: 'routing', type: 'bool' },
          { name: 'addressOrProxyNodes', type: 'string[]' },
        ],
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    name: 'unclaimIdentity',
    type: 'function',
    inputs: [{ name: 'identity', type: 'string' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const;

// Token ABI for approvals
export const TOKEN_ABI = [
  {
    name: 'balanceOf',
    type: 'function',
    inputs: [{ name: 'account', type: 'address' }],
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    name: 'approve',
    type: 'function',
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    outputs: [{ type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    name: 'allowance',
    type: 'function',
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' },
    ],
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
  },
] as const;

// Get contract addresses for chain
export function getContractsForChain(chainId: number) {
  return IDENTITY_CONTRACTS[chainId as keyof typeof IDENTITY_CONTRACTS] || null;
}

// Encode claim identity transaction
export function encodeClaimIdentity(params: ClaimIdentityParams): `0x${string}` {
  return encodeFunctionData({
    abi: REGISTRY_ABI,
    functionName: 'claimIdentity',
    args: [params],
  });
}

// Local duress config storage (encrypted)
const DURESS_STORAGE_KEY = 'pars_duress_config';

export function saveDuressConfig(identity: string, config: DuressConfig): void {
  const existing = localStorage.getItem(DURESS_STORAGE_KEY);
  const configs = existing ? JSON.parse(existing) : {};
  configs[identity] = config;
  localStorage.setItem(DURESS_STORAGE_KEY, JSON.stringify(configs));
}

export function loadDuressConfig(identity: string): DuressConfig | null {
  const existing = localStorage.getItem(DURESS_STORAGE_KEY);
  if (!existing) return null;
  const configs = JSON.parse(existing);
  return configs[identity] || null;
}

export function checkDuressPassword(identity: string, passwordHash: string): 'normal' | 'duress' | 'invalid' {
  const config = loadDuressConfig(identity);
  if (!config) return 'invalid';

  if (passwordHash === config.normalPasswordHash) {
    return 'normal';
  }
  if (passwordHash === config.duressPasswordHash) {
    return 'duress';
  }
  return 'invalid';
}

// Dead man's switch check
export function checkDeadManSwitch(identity: string): boolean {
  const config = loadDuressConfig(identity);
  if (!config) return false;

  const daysSinceCheckIn = (Date.now() - config.lastCheckIn) / (1000 * 60 * 60 * 24);
  return daysSinceCheckIn >= config.deadManSwitchDays;
}

export function updateCheckIn(identity: string): void {
  const config = loadDuressConfig(identity);
  if (!config) return;

  config.lastCheckIn = Date.now();
  saveDuressConfig(identity, config);
}

// Panic wipe - destroy all local identity data
export function panicWipe(): void {
  localStorage.removeItem(DURESS_STORAGE_KEY);
  // Clear any other sensitive data
  sessionStorage.clear();
  // Trigger page reload to clear memory
  window.location.reload();
}
