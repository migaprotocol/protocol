# MIGA Protocol - Development Status

## Overview
MIGA Protocol enables multi-chain minting of MIGA tokens with redemption on Pars Network and Hanzo Network. The protocol implements coercion-resistant identity (pars.id) and integrates with the lux/bridge backend for cross-chain deposits.

## Build Status
✅ **Build Passing** - All code compiles successfully

## Network Status

### Deposit Networks (Source Chains)
| Chain | Chain ID | Status | Deposit Address |
|-------|----------|--------|-----------------|
| Bitcoin | - | ✅ Ready | bc1qem8jywyuc9wtgf7y5n9tyq6tknpj3l85tzg9y6 |
| Ethereum | 1 | ✅ Ready | 0xAaf3a7253c73a58f2713f454717C5338c6573d62 |
| Base | 8453 | ✅ Ready | 0xAaf3a7253c73a58f2713f454717C5338c6573d62 |
| Optimism | 10 | ✅ Ready | 0xAaf3a7253c73a58f2713f454717C5338c6573d62 |
| Arbitrum | 42161 | ✅ Ready | 0xAaf3a7253c73a58f2713f454717C5338c6573d62 |
| BNB Chain | 56 | ✅ Ready | 0xAaf3a7253c73a58f2713f454717C5338c6573d62 |
| Solana | - | ✅ Ready | BPTZhkTdRwqnrb7PnWvi6SkCWQHcvUZrfaYvPkZ2YD8R |
| XRP Ledger | - | ✅ Ready | raBQUYdAhnnojJQ6Xi3eXztZ74ot24RDq1 |
| TON | -239 | ✅ Ready | UQCx0_0l9AxIouVBxThCRAwO7Yrz6rpQGI-1CS7h-lwjqRTW |
| Lux | 96369 | ⚠️ RPC Offline | 0x14542918a9032248ef30d9bc1d57983691e3ade4 |

### Redemption Networks (Destination Chains)
| Chain | Chain ID | RPC Status | Contract Status |
|-------|----------|------------|-----------------|
| Pars Network | 6133 | ⚠️ Offline (405) | NOT DEPLOYED |
| Hanzo Network | 36963 | ⚠️ Offline (502) | NOT DEPLOYED |
| Local (Anvil) | 31337 | ✅ Running | ✅ Ready for testing |

## Contract Deployment Status

### Identity Contracts (HanzoRegistry)
Source: `/Users/z/work/hanzo/ui/app/lib/contracts.ts`

| Network | Chain ID | Registry | Token |
|---------|----------|----------|-------|
| **Local** | 31337 | `0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0` | `0x5FbDB2315678afecb367f032d93F642f64180aa3` |
| Hanzo | 36963 | TBD | TBD |
| Hanzo Testnet | 36962 | TBD | TBD |
| Lux | 96369 | TBD | TBD |
| Lux Testnet | 96368 | TBD | TBD |
| Zoo | 200200 | TBD | TBD |
| Zoo Testnet | 200201 | TBD | TBD |
| **Pars** | 494949 | TBD | TBD |

### Pars Network Configuration
- **Chain ID**: 494949
- **RPC**: https://rpc.pars.network or https://api.pars.network
- **Alternate**: https://rpc.sparklepony.xyz or https://api.sparklepony.xyz
- **Explorer**: https://explore.pars.network
- **Website**: https://pars.network

### MIGA Token
| Network | Address |
|---------|---------|
| **Solana** (all clusters) | `GGqenYGp3Mp9PJ9xFH1yDeHgAzDpGCmvCpUTLEa6twSu` |
| Pars Testnet (96370) | 0x0d0efcd9442fed398e93436179426e3ac5e33d0e |

### Solana Program Configuration
- **Anchor.toml**: `/Users/z/work/miga/token/Anchor.toml`
- **Cluster**: localnet (switchable to devnet/mainnet)
- **Program ID**: `GGqenYGp3Mp9PJ9xFH1yDeHgAzDpGCmvCpUTLEa6twSu`

## Key Files

### Bridge Integration
- `src/services/bridgeApi.ts` - Bridge API service (lux/bridge backend)
- `src/hooks/useBridgeApi.ts` - React hooks for bridge data
- `src/components/bridge/MigaBridge.tsx` - Multi-chain deposit UI
- `src/components/bridge/networks.ts` - Chain configurations
- `src/components/bridge/types.ts` - TypeScript interfaces

### Identity System (pars.id)
- `src/services/identityService.ts` - Contract integration, duress config
- `src/components/identity/ParsIdentity.tsx` - Coercion-resistant identity minting

### 3D Scene
- `src/components/3d/Scene.tsx` - Three.js scene with chain medallions
- `src/components/RaceToNowruz.tsx` - Leaderboard and countdown

## Deployment Checklist

### To Enable Pars Network
1. [ ] Start Pars node: `lux network start && lux chain deploy pars`
2. [ ] Deploy HanzoRegistry to Pars (6133)
3. [ ] Deploy MigaToken to Pars
4. [ ] Update contract addresses in `identityService.ts`
5. [ ] Set `enabled: true` in `networks.ts` for PARS chain

### To Enable Hanzo Network
1. [ ] Start Hanzo node (check ~/work/hanzo/node)
2. [ ] Deploy from `~/work/hanzo/identity/script/DeployLocal.s.sol`
3. [ ] Update contract addresses in `identityService.ts`
4. [ ] Set `enabled: true` in `networks.ts` for HANZO chain

### For Local Development
1. [ ] Start Anvil: `anvil`
2. [ ] Set `VITE_USE_LOCAL_NETWORK=true` in `.env`
3. [ ] Deploy contracts using Forge scripts

## Architecture Decisions

### Coercion Resistance (PIP-0003)
- **Duress passwords**: Show decoy identity when entered under coercion
- **Dead man's switch**: Auto-triggers if user doesn't check in
- **Panic wipe**: Destroy all local identity data instantly
- **Plausible deniability**: Hidden volumes, ephemeral messages

### DAO Treasury (3-of-5 Utila MPC)
- Single EVM address accepts deposits from all EVM chains
- Chain-specific addresses for BTC, SOL, XRP, TON
- Auto-swap stablecoins to native tokens

### Identity Format
- **Legacy**: `@{handle}.{namespace}` (e.g., `@alice.pars`, `@bob.hanzo`)
- **W3C DID**: `did:{method}:{address}` (e.g., `did:pars:0x1234...`)
- Stake-based pricing: 10-100K tokens based on name length

### DID Methods by Network
| Network | Chain ID | DID Method | Example |
|---------|----------|------------|---------|
| **Pars** | 494949 | `did:pars` | `did:pars:0x1234...abcd` |
| **Hanzo** | 36963 | `did:ai` | `did:ai:0x5678...efgh` |
| **Lux** | 96369 | `did:lux` | `did:lux:0x9abc...ijkl` |
| **Zoo** | 200200 | `did:zoo` | `did:zoo:0xdef0...mnop` |

### Identity Sites
| Domain | Network | Location |
|--------|---------|----------|
| pars.id | Pars (494949) | `/Users/z/work/pars/pars.network` (redirect /id) |
| hanzo.id | Hanzo (36963) | `/Users/z/work/hanzo/hanzo.id` |
| lux.id | Lux (96369) | `/Users/z/work/lux/apps/id` |
| zoo.id | Zoo (200200) | `/Users/z/work/zoo/luxid` |
| sparklepony.xyz/id | Pars Alt | `/Users/z/work/pars/pars.network` |

## FHE Integration (LuxFHE)
Location: `/Users/z/work/luxfhe`

### Available Components
| Package | Version | Purpose |
|---------|---------|---------|
| `@luxfhe/sdk` | 0.5.1 | Client SDK for encrypted operations |
| `@luxfhe/wasm` | 0.1.3 | WebAssembly TFHE bindings |
| `@luxfhe/hardhat-plugin` | - | Hardhat integration |
| `@luxfhe/contracts` | - | Solidity FHE contracts |

### Use Cases for pars.id
1. **Encrypted identity attributes** - Hide sensitive data on-chain
2. **Private attestations** - Prove properties without revealing values
3. **Confidential voting** - Privacy-preserving governance
4. **Sealed permits** - Grant temporary decryption rights

### Permit Types
- **Self permit** - Only owner can decrypt
- **Sharing permit** - Grant access to specific addresses
- **Recipient permit** - One-time decryption for receiver

## Recent Changes (2026-01-25)
- Added Pars Network (6133) and Hanzo Network (36963) to chain config
- Added local development support (Anvil, chain ID 31337)
- Updated identity service with multi-chain contract addresses
- Created bridge API hooks for leaderboard polling
- Implemented coercion-resistant identity minting component
- Found Solana MIGA program: `GGqenYGp3Mp9PJ9xFH1yDeHgAzDpGCmvCpUTLEa6twSu`
- Identified FHE infrastructure at `/Users/z/work/luxfhe`
