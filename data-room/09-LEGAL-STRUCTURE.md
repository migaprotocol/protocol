# Legal Structure

## MIGA Protocol: Entity Structure and Compliance Framework

---

## Overview

MIGA Protocol is structured as a decentralized, non-profit protocol with a Swiss foundation for legal clarity and operational requirements.

---

## Entity Structure

```
┌─────────────────────────────────────────────────────────────┐
│                    MIGA FOUNDATION                           │
│                 (Swiss Non-Profit - Pending)                 │
│                                                              │
│  Purpose: Protocol stewardship, legal representation,       │
│           compliance, and operational support                │
└─────────────────────────────┬───────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
┌───────────────┐    ┌───────────────┐    ┌───────────────┐
│   PROTOCOL    │    │  DAO SYSTEM   │    │  CONTRIBUTOR  │
│  (On-Chain)   │    │  (On-Chain)   │    │   NETWORK     │
│               │    │               │    │               │
│ • Contracts   │    │ • 10 DAOs     │    │ • Developers  │
│ • Treasury    │    │ • Governance  │    │ • Community   │
│ • Bridges     │    │ • Voting      │    │ • Partners    │
└───────────────┘    └───────────────┘    └───────────────┘
```

---

## Foundation Details

### MIGA Foundation (Stiftung)

| Attribute | Details |
|-----------|---------|
| Jurisdiction | Zug, Switzerland |
| Type | Non-profit foundation (Stiftung) |
| Status | Formation in progress |
| Purpose | Protocol stewardship and charitable activities |
| Supervision | Swiss Federal Supervisory Authority |

### Why Switzerland?

1. **Clear Legal Framework:** Established foundation law with crypto-friendly guidance
2. **Non-Profit Status:** Recognized charitable structure
3. **Neutrality:** Political independence important for Iran-focused mission
4. **Regulatory Clarity:** FINMA guidance on token classification
5. **Banking Access:** Crypto-friendly banking relationships available

### Foundation Governance

**Board of Directors:**
- 3-5 members
- Independent from core contributors
- Fiduciary duty to foundation purpose
- Elected by existing board (initially by founders)

**Foundation Council:**
- Advisory body with community representatives
- Provides input on major decisions
- No binding authority

**Relationship to DAOs:**
- Foundation executes decisions made by DAO governance
- Cannot override valid governance outcomes
- Provides legal interface for off-chain activities

---

## Token Classification

### Legal Analysis

MIGA tokens are designed to be classified as **utility tokens**, not securities.

**Utility Token Characteristics:**

| Factor | MIGA Implementation |
|--------|---------------------|
| Consumptive Use | Governance voting rights |
| No Profit Expectation | No dividends, no buybacks |
| No Investment Contract | No promises of returns |
| Decentralization | Community-governed protocol |
| Functionality | Required for governance participation |

### Howey Test Analysis (US)

| Prong | Analysis | Assessment |
|-------|----------|------------|
| Investment of Money | Yes - contributions made | Met |
| Common Enterprise | Debatable - decentralized | Partial |
| Expectation of Profits | No - explicitly stated | Not Met |
| Efforts of Others | No - community-driven | Not Met |

**Conclusion:** MIGA is designed to fail prongs 3 and 4 of the Howey test.

### Regulatory Filings

| Jurisdiction | Filing | Status |
|--------------|--------|--------|
| Switzerland | FINMA no-action letter | Planned |
| United States | None (not a security) | N/A |
| European Union | MiCA assessment | Planned |

---

## Sanctions Compliance

### Overview

Given MIGA's focus on the Persian community, sanctions compliance is critical.

### Applicable Sanctions Regimes

| Regime | Authority | Key Prohibitions |
|--------|-----------|------------------|
| US (OFAC) | Treasury Department | Transactions with SDN list |
| EU | Council of the EU | Similar to US |
| UK | OFSI | Similar to US |
| UN | Security Council | Baseline restrictions |

### Compliance Program

**1. Prohibited Activities:**

| Activity | Permitted? |
|----------|------------|
| Payments to Iranian government | No |
| Payments to IRGC or affiliates | No |
| Sanctioned individual transactions | No |
| Humanitarian aid to Iranian people | Yes (exempt) |
| Cultural/educational support | Yes (generally permitted) |

**2. Screening Procedures:**

- SDN list screening for large contributors (>$10,000)
- Ongoing monitoring of recipient addresses
- Third-party compliance vendor integration
- Suspicious activity reporting

**3. Humanitarian Exemptions:**

OFAC provides exemptions for:
- Medical supplies and equipment
- Food and agricultural products
- Information and communications materials
- Humanitarian donations to Iranian people

MIGA activities are designed to fall within these exemptions.

### Geographic Restrictions

| Region | Status | Notes |
|--------|--------|-------|
| United States | Permitted | With compliance measures |
| European Union | Permitted | With compliance measures |
| Iran | Complex | Only for humanitarian activities |
| OFAC high-risk jurisdictions | Case-by-case | Enhanced due diligence |

---

## Contributor Compliance

### Know Your Customer (KYC)

| Contribution Level | KYC Required |
|--------------------|--------------|
| <$1,000 | No |
| $1,000 - $10,000 | Basic (email, country) |
| >$10,000 | Full KYC |
| DAO council members | Full KYC |

### Contributor Representations

By participating, contributors confirm:
- Not a sanctioned person or entity
- Not acting on behalf of sanctioned parties
- Complying with local laws
- Not using proceeds for prohibited purposes

### Privacy Considerations

**Balancing compliance with privacy:**
- On-chain contributions are pseudonymous
- KYC data stored off-chain, encrypted
- Data shared only with legal requirements
- Optional enhanced privacy via Lux FHE

---

## Intellectual Property

### Open Source Licensing

| Component | License |
|-----------|---------|
| Smart Contracts | MIT |
| Frontend | MIT |
| Documentation | CC BY 4.0 |
| Brand Assets | Trademark (Foundation) |

### Trademarks

The following are registered/pending trademarks:
- MIGA™
- MIGA Protocol™
- [Logo]

Trademark owned by MIGA Foundation for community benefit.

---

## Data Protection

### GDPR Compliance

| Requirement | Implementation |
|-------------|----------------|
| Lawful basis | Legitimate interest / Consent |
| Data minimization | Collect only necessary data |
| Right to access | Dashboard for user data |
| Right to erasure | Available for off-chain data |
| Data security | Encryption, access controls |

### Data Processing

| Data Type | Storage | Retention |
|-----------|---------|-----------|
| Wallet addresses | On-chain | Permanent |
| KYC documents | Off-chain (encrypted) | 5 years |
| Communication | Encrypted | 2 years |
| Analytics | Anonymized | 1 year |

---

## Dispute Resolution

### Governance Disputes

Internal governance disputes resolved through:
1. DAO voting
2. Oversight DAO arbitration
3. Foundation mediation

### Legal Disputes

| Dispute Type | Resolution |
|--------------|------------|
| Foundation matters | Swiss courts (Zug) |
| Smart contract disputes | Arbitration (Singapore) |
| Contributor claims | Arbitration (Singapore) |

### Arbitration Clause

> Any dispute arising from participation in MIGA Protocol shall be resolved by binding arbitration administered by the Singapore International Arbitration Centre (SIAC) under its rules then in effect.

---

## Tax Considerations

### Foundation Taxation

| Jurisdiction | Tax Treatment |
|--------------|---------------|
| Switzerland | Tax-exempt (non-profit) |
| Other | Subject to local rules |

### Contributor Taxation

| Event | Potential Tax Treatment |
|-------|------------------------|
| Contribution | May be deductible as donation |
| Token receipt | May be taxable income |
| Token sale | Capital gains tax likely |
| Governance rewards | Likely taxable income |

**Important:** Contributors are responsible for their own tax obligations. Consult a tax professional in your jurisdiction.

---

## Regulatory Roadmap

### Current Status (Q1 2025)

| Item | Status |
|------|--------|
| Foundation formation | In progress |
| Legal opinions | Draft complete |
| FINMA consultation | Planned |
| Compliance vendor | Evaluation |

### Planned Filings

| Filing | Jurisdiction | Timeline |
|--------|--------------|----------|
| Foundation registration | Switzerland | Q2 2025 |
| FINMA no-action | Switzerland | Q3 2025 |
| Trademark registrations | Multiple | Q2 2025 |
| VASP registration (if required) | TBD | 2026 |

### Ongoing Compliance

| Activity | Frequency |
|----------|-----------|
| SDN list screening | Continuous |
| Policy review | Quarterly |
| Legal opinion updates | Annual |
| Audit | Annual |

---

## Legal Counsel

### Retained Advisors

| Area | Firm | Jurisdiction |
|------|------|--------------|
| Foundation | [Swiss Firm] | Switzerland |
| Securities | [US Firm] | United States |
| Sanctions | [Specialist] | US/EU |
| General Crypto | [Crypto Firm] | Global |

### Contact

For legal inquiries: legal@miga.network

---

## Disclaimers

### No Legal Advice

This document is for informational purposes only and does not constitute legal advice. Contributors should consult their own legal counsel.

### No Guarantees

The legal structure described is designed to achieve certain objectives but there is no guarantee that regulators will agree with our analysis.

### Subject to Change

Legal structures and compliance measures may be modified based on regulatory developments, legal advice, or governance decisions.

---

*This document reflects current legal planning and is subject to change. Final structure will be confirmed upon foundation registration.*
