# Technical Architecture

## MIGA Protocol: System Design and Infrastructure

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Smart Contract Architecture](#smart-contract-architecture)
3. [Multi-Chain Infrastructure](#multi-chain-infrastructure)
4. [Privacy Layer](#privacy-layer)
5. [Security Model](#security-model)
6. [Frontend Architecture](#frontend-architecture)
7. [Infrastructure & DevOps](#infrastructure--devops)

---

## Architecture Overview

### System Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                              FRONTEND                                    │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐    │
│  │  Web App    │  │  Mobile     │  │  Governance │  │  Treasury   │    │
│  │  (React)    │  │  (PWA)      │  │  Portal     │  │  Dashboard  │    │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘    │
└─────────┼────────────────┼────────────────┼────────────────┼────────────┘
          │                │                │                │
          └────────────────┴────────┬───────┴────────────────┘
                                    │
┌───────────────────────────────────┼─────────────────────────────────────┐
│                              API LAYER                                   │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐    │
│  │  GraphQL    │  │  REST API   │  │  WebSocket  │  │  RPC Proxy  │    │
│  │  Gateway    │  │  (Public)   │  │  (Events)   │  │  (Multi-RPC)│    │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘    │
└─────────┼────────────────┼────────────────┼────────────────┼────────────┘
          │                │                │                │
          └────────────────┴────────┬───────┴────────────────┘
                                    │
┌───────────────────────────────────┼─────────────────────────────────────┐
│                           PROTOCOL LAYER                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐    │
│  │   Token     │  │  Bonding    │  │ Governance  │  │  Treasury   │    │
│  │  Contracts  │  │   Curve     │  │  Contracts  │  │  Contracts  │    │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘    │
└─────────┼────────────────┼────────────────┼────────────────┼────────────┘
          │                │                │                │
          └────────────────┴────────┬───────┴────────────────┘
                                    │
┌───────────────────────────────────┼─────────────────────────────────────┐
│                         BLOCKCHAIN LAYER                                 │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐    │
│  │ Solana │ │  ETH   │ │  Base  │ │  Arb   │ │ Polygon│ │  Lux   │    │
│  └───┬────┘ └───┬────┘ └───┬────┘ └───┬────┘ └───┬────┘ └───┬────┘    │
│      │          │          │          │          │          │          │
│      └──────────┴──────────┴────┬─────┴──────────┴──────────┘          │
│                                 │                                       │
│  ┌──────────────────────────────┴───────────────────────────────────┐  │
│  │                     BRIDGE LAYER                                  │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐               │  │
│  │  │  Wormhole   │  │  LayerZero  │  │  Lux Bridge │               │  │
│  │  └─────────────┘  └─────────────┘  └─────────────┘               │  │
│  └──────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
┌───────────────────────────────────┼─────────────────────────────────────┐
│                           PRIVACY LAYER                                  │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                      Lux FHE Network                             │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐              │   │
│  │  │  Shielded   │  │   Private   │  │  ZK Proof   │              │   │
│  │  │   Voting    │  │  Transfers  │  │ Generation  │              │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘              │   │
│  └─────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
```

### Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Frontend | React 18, TypeScript, Vite | User interface |
| Styling | Tailwind CSS, Radix UI | Design system |
| 3D/Graphics | Three.js, React Three Fiber | Visual elements |
| State | React Query, Zustand | Client state management |
| Blockchain | Solana Web3.js, ethers.js | Chain interaction |
| Smart Contracts | Rust (Solana), Solidity (EVM) | On-chain logic |
| Bridges | Wormhole SDK, LayerZero | Cross-chain |
| Privacy | Lux FHE SDK | Encrypted computation |
| Infrastructure | Vercel, Cloudflare | Hosting, CDN |

---

## Smart Contract Architecture

### Solana Contracts (Primary Chain)

```
programs/
├── miga-token/
│   ├── src/
│   │   ├── lib.rs           # Program entry
│   │   ├── state.rs         # Account structures
│   │   ├── instructions/
│   │   │   ├── initialize.rs
│   │   │   ├── transfer.rs
│   │   │   └── burn.rs
│   │   └── errors.rs
│   └── Cargo.toml
│
├── bonding-curve/
│   ├── src/
│   │   ├── lib.rs
│   │   ├── state.rs
│   │   ├── instructions/
│   │   │   ├── initialize.rs
│   │   │   ├── buy.rs
│   │   │   ├── sell.rs
│   │   │   └── claim.rs
│   │   ├── math.rs          # Curve calculations
│   │   └── errors.rs
│   └── Cargo.toml
│
├── governance/
│   ├── src/
│   │   ├── lib.rs
│   │   ├── state.rs
│   │   ├── instructions/
│   │   │   ├── create_proposal.rs
│   │   │   ├── cast_vote.rs
│   │   │   ├── execute_proposal.rs
│   │   │   └── delegate.rs
│   │   └── errors.rs
│   └── Cargo.toml
│
└── treasury/
    ├── src/
    │   ├── lib.rs
    │   ├── state.rs
    │   ├── instructions/
    │   │   ├── initialize.rs
    │   │   ├── deposit.rs
    │   │   ├── withdraw.rs
    │   │   └── allocate.rs
    │   └── errors.rs
    └── Cargo.toml
```

### EVM Contracts

```solidity
// MIGA Token (ERC-20)
contract MIGAToken is ERC20, ERC20Permit, Ownable {
    constructor() ERC20("MIGA", "MIGA") ERC20Permit("MIGA") {
        // Minted via bridge only
    }

    function mint(address to, uint256 amount) external onlyBridge {
        _mint(to, amount);
    }

    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
    }
}

// Governance
contract MIGAGovernor is Governor, GovernorSettings, GovernorVotes,
    GovernorVotesQuorumFraction, GovernorTimelockControl {

    constructor(
        IVotes _token,
        TimelockController _timelock
    ) Governor("MIGA Governor")
      GovernorSettings(1 days, 1 weeks, 1e18)
      GovernorVotes(_token)
      GovernorVotesQuorumFraction(4)
      GovernorTimelockControl(_timelock) {}
}

// Treasury
contract MIGATreasury is AccessControl, ReentrancyGuard {
    bytes32 public constant EXECUTOR_ROLE = keccak256("EXECUTOR_ROLE");

    function execute(
        address target,
        uint256 value,
        bytes calldata data
    ) external onlyRole(EXECUTOR_ROLE) nonReentrant returns (bytes memory) {
        (bool success, bytes memory result) = target.call{value: value}(data);
        require(success, "Execution failed");
        return result;
    }
}
```

### Contract Interactions

```
User Action: Buy MIGA via Bonding Curve

┌──────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   User   │────▶│ Bonding Curve│────▶│  MIGA Token  │────▶│   Treasury   │
│  Wallet  │     │   Contract   │     │   Contract   │     │   Contract   │
└──────────┘     └──────────────┘     └──────────────┘     └──────────────┘
     │                  │                    │                    │
     │  1. Send SOL     │                    │                    │
     │─────────────────▶│                    │                    │
     │                  │  2. Calculate      │                    │
     │                  │     tokens         │                    │
     │                  │  3. Transfer SOL   │                    │
     │                  │────────────────────┼───────────────────▶│
     │                  │  4. Mint MIGA      │                    │
     │                  │───────────────────▶│                    │
     │                  │                    │  5. Transfer to    │
     │◀─────────────────┼────────────────────│     user           │
     │  6. Receive MIGA │                    │                    │
```

---

## Multi-Chain Infrastructure

### Chain Configuration

| Chain | Chain ID | RPC Endpoint | Block Time | Finality |
|-------|----------|--------------|------------|----------|
| Solana | Mainnet | Helius/Triton | 400ms | ~13s |
| Ethereum | 1 | Alchemy/Infura | 12s | ~15min |
| Base | 8453 | Base RPC | 2s | ~15min |
| Arbitrum | 42161 | Arbitrum RPC | 250ms | ~15min |
| Polygon | 137 | Polygon RPC | 2s | ~30min |
| Lux | TBD | Lux RPC | 2s | ~2min |

### Bridge Integration

**Wormhole (Solana ↔ EVM):**

```typescript
// Sending tokens from Solana to Ethereum
async function bridgeToEthereum(
  amount: bigint,
  recipient: string
): Promise<string> {
  // 1. Transfer to Wormhole custody
  const transferTx = await wormhole.transferFromSolana(
    connection,
    MIGA_MINT,
    amount,
    recipient,
    CHAIN_ID_ETH
  );

  // 2. Get VAA (Verifiable Action Approval)
  const vaa = await getSignedVAAWithRetry(
    WORMHOLE_RPC_HOSTS,
    CHAIN_ID_SOLANA,
    emitterAddress,
    sequence
  );

  // 3. Redeem on Ethereum
  const redeemTx = await wormhole.redeemOnEth(
    ETH_TOKEN_BRIDGE,
    signer,
    vaa
  );

  return redeemTx.hash;
}
```

**LayerZero (EVM ↔ EVM):**

```solidity
// Cross-chain message sending
function sendCrossChain(
    uint16 _dstChainId,
    bytes calldata _payload
) external payable {
    bytes memory adapterParams = abi.encodePacked(
        uint16(1),
        uint256(200000)
    );

    _lzSend(
        _dstChainId,
        _payload,
        payable(msg.sender),
        address(0),
        adapterParams,
        msg.value
    );
}
```

### MPC Custody

**Utila MPC Configuration:**

| Parameter | Value |
|-----------|-------|
| Threshold | 3-of-5 |
| Key Shares | 5 DAO signers |
| Key Generation | Distributed (no single party sees full key) |
| Signing | Threshold signatures |
| Chains | All supported chains |

```typescript
// MPC wallet interaction
interface MPCWallet {
  address: string;
  threshold: number;
  signers: string[];

  async signTransaction(tx: Transaction): Promise<SignedTransaction>;
  async broadcastTransaction(signedTx: SignedTransaction): Promise<string>;
}

// Signing flow
async function executeTransfer(
  wallet: MPCWallet,
  to: string,
  amount: bigint
): Promise<string> {
  // 1. Create unsigned transaction
  const tx = await createTransferTx(wallet.address, to, amount);

  // 2. Request signatures from signers (3-of-5 required)
  const signedTx = await wallet.signTransaction(tx);

  // 3. Broadcast
  return wallet.broadcastTransaction(signedTx);
}
```

---

## Privacy Layer

### Lux FHE Integration

**Fully Homomorphic Encryption** enables computation on encrypted data:

```
┌─────────────────────────────────────────────────────────────┐
│                    PUBLIC BLOCKCHAIN                         │
│  ┌─────────────┐                      ┌─────────────┐       │
│  │  Encrypted  │                      │  Encrypted  │       │
│  │   Inputs    │─────────────────────▶│   Outputs   │       │
│  └─────────────┘                      └─────────────┘       │
│         │                                    ▲               │
│         │                                    │               │
│         ▼                                    │               │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                  FHE COMPUTATION                       │  │
│  │                                                        │  │
│  │  1. Encrypted vote received                           │  │
│  │  2. Vote added to encrypted tally (no decryption)     │  │
│  │  3. Final tally decrypted only after voting ends      │  │
│  │  4. ZK proof of correct computation published         │  │
│  │                                                        │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Shielded Voting

```typescript
// Shielded vote submission
async function castShieldedVote(
  proposalId: string,
  vote: boolean,
  votePower: bigint
): Promise<string> {
  // 1. Encrypt vote with FHE public key
  const encryptedVote = await luxFHE.encrypt({
    vote,
    power: votePower,
  });

  // 2. Generate ZK proof that vote is valid
  const proof = await generateVoteProof({
    encryptedVote,
    voterCommitment: await getVoterCommitment(),
    proposalId,
  });

  // 3. Submit to contract
  return governanceContract.submitShieldedVote(
    proposalId,
    encryptedVote,
    proof
  );
}

// Vote tallying (by authorized decryption committee)
async function tallyVotes(proposalId: string): Promise<VoteResult> {
  // 1. Aggregate encrypted votes (homomorphic addition)
  const aggregatedEncrypted = await luxFHE.aggregateVotes(proposalId);

  // 2. Threshold decryption (requires 3-of-5 committee members)
  const result = await luxFHE.thresholdDecrypt(aggregatedEncrypted);

  // 3. Publish result with proof of correct decryption
  return {
    yesVotes: result.yes,
    noVotes: result.no,
    proof: result.decryptionProof,
  };
}
```

### Private Transfers

For users requiring privacy (e.g., contributors in high-risk jurisdictions):

```typescript
// Shielded transfer
async function shieldedTransfer(
  to: ShieldedAddress,
  amount: bigint
): Promise<string> {
  // 1. Create commitment
  const commitment = await createCommitment(to, amount);

  // 2. Generate ZK proof
  const proof = await generateTransferProof({
    commitment,
    nullifier: await getNullifier(),
    merkleProof: await getMerkleProof(),
  });

  // 3. Submit shielded transaction
  return privacyPool.transfer(commitment, proof);
}
```

---

## Security Model

### Security Layers

```
┌─────────────────────────────────────────────────────────────┐
│ Layer 1: Smart Contract Security                             │
│ - Formal verification of critical paths                      │
│ - Multiple independent audits                                │
│ - Comprehensive test coverage (>95%)                         │
│ - Immutable core contracts                                   │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│ Layer 2: Operational Security                                │
│ - MPC custody (no single point of failure)                   │
│ - Timelocks on all privileged operations                     │
│ - Multi-sig requirements for treasury                        │
│ - Rate limiting on sensitive operations                      │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│ Layer 3: Economic Security                                   │
│ - Slashing for malicious behavior                            │
│ - Bug bounty program                                         │
│ - Insurance fund                                             │
│ - Circuit breakers for anomalies                             │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│ Layer 4: Infrastructure Security                             │
│ - DDoS protection (Cloudflare)                               │
│ - Multi-region deployment                                    │
│ - Encrypted secrets management                               │
│ - Continuous monitoring and alerting                         │
└─────────────────────────────────────────────────────────────┘
```

### Audit Plan

| Component | Auditor | Timeline | Status |
|-----------|---------|----------|--------|
| Token Contracts | Trail of Bits | Q4 2025 | Planned |
| Bonding Curve | OpenZeppelin | Q4 2025 | Planned |
| Governance | Consensys Diligence | Q1 2026 | Planned |
| Bridge Integration | Wormhole Security | Inherited | Complete |
| Privacy Layer | Lux Security | Q1 2026 | Planned |

### Bug Bounty Program

| Severity | Reward | Examples |
|----------|--------|----------|
| Critical | $100,000 | Fund theft, governance takeover |
| High | $25,000 | Privilege escalation, DoS |
| Medium | $5,000 | Information disclosure |
| Low | $1,000 | Best practice violations |

---

## Frontend Architecture

### Application Structure

```
src/
├── app/                    # Next.js app router
│   ├── (public)/          # Public pages
│   │   ├── page.tsx       # Landing
│   │   ├── token/         # Token info
│   │   └── docs/          # Documentation
│   ├── (app)/             # Authenticated pages
│   │   ├── mint/          # Pre-sale
│   │   ├── governance/    # Voting
│   │   └── treasury/      # Dashboard
│   └── api/               # API routes
│
├── components/
│   ├── ui/                # Radix UI primitives
│   ├── 3d/                # Three.js components
│   ├── wallet/            # Wallet connection
│   ├── governance/        # Voting UI
│   └── bridge/            # Cross-chain UI
│
├── hooks/
│   ├── useWallet.ts       # Wallet state
│   ├── useGovernance.ts   # Governance queries
│   ├── useTreasury.ts     # Treasury queries
│   └── usePrice.ts        # Price feeds
│
├── lib/
│   ├── solana/            # Solana utilities
│   ├── evm/               # EVM utilities
│   ├── api/               # API client
│   └── utils/             # Helpers
│
└── styles/
    └── globals.css        # Tailwind + custom
```

### Performance Optimizations

| Optimization | Implementation |
|--------------|----------------|
| Lazy Loading | React.lazy + Suspense for routes |
| Code Splitting | Dynamic imports for heavy components |
| 3D Performance | PerformanceContext auto-adjusts quality |
| Image Optimization | Next.js Image + WebP |
| Caching | React Query with stale-while-revalidate |
| Bundle Size | Tree shaking, compression |

---

## Infrastructure & DevOps

### Deployment Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         CDN (Cloudflare)                     │
│                    DDoS Protection + Caching                 │
└─────────────────────────────┬───────────────────────────────┘
                              │
┌─────────────────────────────┼───────────────────────────────┐
│                         │                                    │
│    ┌────────────────────▼────────────────────┐              │
│    │           Vercel Edge Network            │              │
│    │    (Serverless Functions + Static)       │              │
│    └────────────────────┬────────────────────┘              │
│                         │                                    │
│    ┌────────────────────┼────────────────────┐              │
│    │                    │                    │              │
│    ▼                    ▼                    ▼              │
│ ┌──────────┐      ┌──────────┐        ┌──────────┐         │
│ │  US East │      │ EU West  │        │ AP South │         │
│ │  Region  │      │  Region  │        │  Region  │         │
│ └──────────┘      └──────────┘        └──────────┘         │
│                                                              │
└──────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────┼───────────────────────────────┐
│                    Backend Services                          │
│                                                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   GraphQL   │  │   Indexer   │  │  Price Feed │         │
│  │   Gateway   │  │  (TheGraph) │  │   (Pyth)    │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### Monitoring & Alerting

| System | Tool | Purpose |
|--------|------|---------|
| Application | Vercel Analytics | Performance, errors |
| Infrastructure | Datadog | Server metrics |
| Blockchain | Tenderly | Contract monitoring |
| Uptime | Pingdom | Availability |
| Security | Forta | Threat detection |

### CI/CD Pipeline

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm ci
      - run: npm test
      - run: npm run lint
      - run: npm run typecheck

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

---

## Summary

MIGA's technical architecture is designed for:

1. **Security:** Multiple layers of protection, audited contracts, MPC custody
2. **Scalability:** Multi-chain from day one, efficient bridge architecture
3. **Privacy:** FHE-based private voting and transfers
4. **Performance:** Optimized frontend, global CDN, efficient indexing
5. **Reliability:** Multi-region deployment, comprehensive monitoring

The system prioritizes user safety and protocol security while maintaining the performance necessary for a production application serving a global user base.

---

*Technical specifications subject to change based on audit findings and governance decisions.*
