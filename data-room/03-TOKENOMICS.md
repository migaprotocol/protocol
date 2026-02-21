# Tokenomics

## MIGA Token Economics: Complete Technical Specification

---

## Table of Contents

1. [Token Overview](#token-overview)
2. [Supply Distribution](#supply-distribution)
3. [Multi-Chain Architecture](#multi-chain-architecture)
4. [Bonding Curve Mechanics](#bonding-curve-mechanics)
5. [Governance Token System](#governance-token-system)
6. [Fee Structure](#fee-structure)
7. [Emission Schedule](#emission-schedule)
8. [Economic Security](#economic-security)

---

## Token Overview

### Core Parameters

| Parameter | Value |
|-----------|-------|
| Token Name | MIGA |
| Token Symbol | MIGA |
| Total Supply | 7,000,000,000 |
| Decimals | 9 (Solana), 18 (EVM chains) |
| Primary Chain | Solana |
| Token Standard | SPL (Solana), ERC-20 (EVM) |
| Mintable | No (fixed supply) |
| Burnable | No |

### Design Principles

1. **Fixed Supply:** No inflation, no minting after genesis
2. **Zero Insider Allocation:** No team, advisor, or VC tokens
3. **Multi-Chain Native:** Designed for 7 chains from day one
4. **Governance-First:** Token exists to enable collective decision-making
5. **Fair Distribution:** Bonding curve ensures fair price discovery

---

## Supply Distribution

### Allocation Breakdown

```
Total Supply: 7,000,000,000 MIGA

┌────────────────────────────────────────────────────────┐
│                    DAO TREASURY                         │
│                    50% (3,500,000,000)                  │
├────────────────────────────────────────────────────────┤
│                     PRE-SALE                            │
│                    40% (2,800,000,000)                  │
├────────────────────────────────────────────────────────┤
│    LIQUIDITY     │
│    10% (700M)    │
└──────────────────┘
```

### Detailed Allocation

| Allocation | Tokens | Percentage | Unlock Schedule |
|------------|--------|------------|-----------------|
| DAO Treasury | 3,500,000,000 | 50% | Governed by token holders |
| Pre-Sale | 2,800,000,000 | 40% | 100% at launch |
| Liquidity | 700,000,000 | 10% | Locked in DEX pools |
| Team | 0 | 0% | N/A |
| Advisors | 0 | 0% | N/A |
| VCs/Investors | 0 | 0% | N/A |
| Marketing | 0 | 0% | N/A |

### DAO Treasury Governance

The 50% DAO Treasury allocation is governed by token holders through on-chain voting:

**Permitted Uses:**
- Protocol development grants
- Humanitarian initiatives
- Liquidity incentives
- Security audits and bug bounties
- Operational expenses
- Strategic partnerships

**Governance Requirements:**
- Minimum 1% of supply to create proposal
- 4% quorum for standard proposals
- 10% quorum for treasury proposals >$1M
- 48-hour minimum timelock
- 7-day voting period

### Pre-Sale Mechanics

The 40% pre-sale allocation is distributed to early contributors:

| Phase | Timeline | Pricing | Allocation |
|-------|----------|---------|------------|
| Race to Nowruz | Now - Mar 20, 2025 | Best prices | Variable by chain |
| Claim Period | Jan 2026 | N/A | 100% unlocked |

**Chain Competition:**
- 7 chains compete for pre-sale allocation
- Each chain's allocation proportional to its contribution
- More investment in a chain = more tokens for that chain's contributors

### Liquidity Provision

The 10% liquidity allocation ensures trading depth:

| Pool | DEX | Allocation | Lock Period |
|------|-----|------------|-------------|
| MIGA/SOL | Meteora DLMM | 500M MIGA | Permanent |
| MIGA/ETH | Uniswap V3 | 100M MIGA | Permanent |
| MIGA/USDC | Jupiter | 100M MIGA | Permanent |

---

## Multi-Chain Architecture

### Supported Chains

| Chain | Standard | Status | Initial Supply |
|-------|----------|--------|----------------|
| Solana | SPL | Primary | 1,000,000,000 |
| Ethereum | ERC-20 | Q2 2025 | 1,000,000,000 |
| Base | ERC-20 | Q2 2025 | 1,000,000,000 |
| Arbitrum | ERC-20 | Q3 2025 | 1,000,000,000 |
| Polygon | ERC-20 | Q3 2025 | 1,000,000,000 |
| Lux | ERC-20 | Q4 2025 | 1,000,000,000 |
| Bitcoin | Runes | 2027 | 1,000,000,000 |

*Note: Supply distributed across chains based on demand. Total remains 7B.*

### Bridge Architecture

**Primary Bridges:**

| Route | Bridge | Security Model |
|-------|--------|----------------|
| Solana ↔ EVM | Wormhole | Guardian network (19 validators) |
| EVM ↔ EVM | LayerZero | Ultra Light Nodes |
| EVM ↔ Lux | Lux Bridge | Native bridge |
| Solana ↔ Bitcoin | Zeus Network | TSS + Bitcoin scripts |

**Cross-Chain Token Representation:**

```
Solana (Native MIGA)
    │
    ├──[Wormhole]──→ Ethereum (wMIGA)
    │                    │
    │                    ├──[LayerZero]──→ Base (wMIGA)
    │                    ├──[LayerZero]──→ Arbitrum (wMIGA)
    │                    └──[LayerZero]──→ Polygon (wMIGA)
    │
    ├──[Wormhole]──→ Lux (wMIGA)
    │
    └──[Zeus Network]──→ Bitcoin (MIGA Runes)
```

---

## Bonding Curve Mechanics

### Curve Design

The pre-sale uses a linear bonding curve for fair price discovery:

```
Price = StartPrice + (TokensSold / TotalForSale) × (EndPrice - StartPrice)
```

### Parameters

| Parameter | Value |
|-----------|-------|
| Start Price | 0.0000001 SOL |
| End Price | 0.00001 SOL |
| Price Multiple | 100x |
| Tokens Available | 2,800,000,000 |
| Curve Type | Linear |

### Price Schedule

| % Sold | Price (SOL) | Multiple from Start |
|--------|-------------|---------------------|
| 0% | 0.0000001 | 1x |
| 10% | 0.00000109 | 10.9x |
| 25% | 0.00000325 | 32.5x |
| 50% | 0.0000055 | 55x |
| 75% | 0.00000775 | 77.5x |
| 100% | 0.00001 | 100x |

### Slippage Protection

All transactions include slippage protection:

```solidity
function buy(uint256 maxPrice, uint256 minTokens) external payable {
    uint256 price = getCurrentPrice();
    require(price <= maxPrice, "Price exceeded max");

    uint256 tokens = calculateTokens(msg.value);
    require(tokens >= minTokens, "Insufficient tokens");

    // Execute purchase
}
```

---

## Governance Token System

### Four-Token Model

MIGA uses a sophisticated four-token governance system:

```
┌─────────────┐     ┌─────────────┐
│    MIGA     │     │    PARS     │
│  Collateral │     │  Emission   │
└──────┬──────┘     └──────┬──────┘
       │                   │
       │    ┌─────────┐    │
       └────┤  Lock   ├────┘
            └────┬────┘
                 │
          ┌──────┴──────┐
          │   vePARS    │
          │  Governance │
          └──────┬──────┘
                 │
          ┌──────┴──────┐
          │   sPARS     │
          │  Rebasing   │
          └─────────────┘
```

### Token Descriptions

| Token | Type | Purpose | Mechanism |
|-------|------|---------|-----------|
| MIGA | Collateral | Skin in the game | Fixed supply, tradeable |
| PARS | Emission | Participation rewards | Inflationary, earned |
| sPARS | Rebasing | Compounding rewards | Auto-compounds PARS |
| vePARS | Vote-Escrow | Governance power | Lock MIGA+PARS together |

### vePARS Formula

Governance power is calculated as:

```
vePARS = min(PARS, MIGA) × √(lock_duration / max_duration)
```

**Design Rationale:**

1. **min(PARS, MIGA):** Requires both tokens—whales with only one cannot dominate
2. **Square root:** Diminishing returns prevent single-entity capture
3. **Lock duration:** Longer commitment = more governance power

### Lock Periods

| Lock Period | Multiplier | Max vePARS |
|-------------|------------|------------|
| 1 month | 0.29x | 29% of eligible |
| 3 months | 0.50x | 50% of eligible |
| 6 months | 0.71x | 71% of eligible |
| 12 months | 1.00x | 100% of eligible |

---

## Fee Structure

### Protocol Fees

| Activity | Fee | Distribution |
|----------|-----|--------------|
| DEX Trading | 0.30% | 10% DAOs, 90% LPs |
| Cross-Chain Bridge | 0.10% | 100% Treasury |
| Governance Proposals | 100 MIGA | 100% Burned |
| Premium API Access | Variable | 100% Treasury |

### DAO Fee Distribution

The 10% of trading fees allocated to DAOs is distributed equally:

```
Trading Fee (0.30%)
    │
    └── 10% to DAOs (0.03%)
            │
            ├── Security DAO (1%)
            ├── Treasury DAO (1%)
            ├── Health DAO (1%)
            ├── Culture DAO (1%)
            ├── Research DAO (1%)
            ├── Infrastructure DAO (1%)
            ├── Partnerships DAO (1%)
            ├── Investing DAO (1%)
            ├── Oversight DAO (1%)
            └── Humanitarian DAO (1%)
```

---

## Emission Schedule

### PARS Emission

PARS tokens are emitted to reward protocol participation:

**Year 1:**
| Category | Annual Emission | Distribution |
|----------|-----------------|--------------|
| Liquidity Mining | 100M PARS | LP providers |
| Governance Participation | 50M PARS | Active voters |
| Humanitarian Verification | 25M PARS | Impact validators |
| Development Grants | 25M PARS | Contributors |
| **Total** | **200M PARS** | |

**Emission Decay:**
- Year 2: 150M PARS (-25%)
- Year 3: 112.5M PARS (-25%)
- Year 4: 84.4M PARS (-25%)
- Year 5+: Governance-determined

### Inflation Impact

PARS inflation is offset by:
1. Lock-up in vePARS (reduces circulating supply)
2. sPARS rebasing (rewards long-term holders)
3. Governance requiring both MIGA and PARS
4. PARS burn mechanisms

---

## Economic Security

### Attack Vectors & Mitigations

| Attack | Risk | Mitigation |
|--------|------|------------|
| 51% governance attack | Medium | vePARS formula requires both tokens + time lock |
| Treasury drain | Low | Timelock + multisig + quorum requirements |
| Flash loan governance | Low | Snapshot voting, not block-based |
| Bridge exploit | Medium | Multiple independent bridges, gradual rollout |
| Price manipulation | Medium | DLMM pools, circuit breakers |

### Circuit Breakers

Automatic protections trigger under extreme conditions:

| Condition | Action |
|-----------|--------|
| >30% price drop in 1 hour | Trading pause (1 hour) |
| >50% bridge outflow in 24h | Bridge pause |
| >10% treasury proposal | Extended voting (14 days) |
| Anomaly detection | Alert + manual review |

### Audit Status

| Component | Auditor | Status |
|-----------|---------|--------|
| Token Contracts | Pending | Q1 2026 |
| Bonding Curve | Pending | Q1 2026 |
| Bridge Contracts | Wormhole/LZ | Inherited |
| Governance | Pending | Q1 2026 |

---

## Summary

MIGA's tokenomics are designed for:

1. **Fairness:** Zero insider allocation, linear bonding curve
2. **Sustainability:** Protocol fees fund ongoing operations
3. **Alignment:** Governance requires commitment (both tokens + time)
4. **Security:** Multiple layers of protection against attacks
5. **Scalability:** Multi-chain architecture from genesis

The model prioritizes long-term protocol health over short-term speculation, making MIGA suitable for its mission as a sovereign wealth fund rather than a speculative asset.

---

*This document is for informational purposes only. Token parameters may be adjusted through governance after launch.*
