# Greenput: The SMB Growth Platform (Bannerless Hosting & Ads)

Greenput is a **vertical web hosting and lead generation platform** for SMBs (e.g., electricians, plumbers) that completely eliminates cookie banners by unifying the entire funnel: **Hosting + Ad Campaign + Lead Intake**.

## The "Magic Sauce" Strategy

### 1. Hosted by Greenput (Built with BaseNative)

We don't just provide a widget; we **host the SMB's entire website**.

- **For the SMB**: Better performance, extensibility to enterprise scale, and cheaper than WordPress.
- **For the User**: A seamless, first-party experience.

### 2. Client-Owned Ad Campaigns

We manage Google/Social campaigns for the SMB, but the campaigns run **strictly to the SMB's own Greenput-hosted site**.

- Because the user clicks an ad for "Sparky's Electric" and lands on "Sparky's Electric" (hosted by Greenput), their relationship is direct.
- **Result**: No third-party cookie banners required. The "Action" (clicking the ad and submitting the form) **IS** the consent.

### 3. FSM-Driven Pricing Engine

When a user submits a request, our **Field Service Management (FSM)** engine calculates real-time estimates instantly.

- Users see pricing _before_ they commit.
- They can accept the estimate or decline.

### 4. The "No-Risk" Lead Pool (Redistribution)

If the user **does not convert** (declines the estimate) for the original SMB (e.g., Sparky's Electric):

1.  **Sparky is NOT charged** for the lead cost.
2.  The lead is **returned to the Greenput Pool**.
3.  The user is offered matches from _other_ suppliers in the pool ("Move on to another client/supplier").
4.  Greenput monetizes by selling that valid lead to the next available provider.

**Summary**: The user gets secure, instant pricing. The SMB gets risk-free leads (only pay for conversion/opportunity). Greenput aggregates the demand.

---

## Technical Architecture

### Bannerless Consent

- **Mechanism**: First-party context. The user intends to interact with the specific brand.
- **Visuals**: "Action is Consent" transparency notices (as seen in `GreenputShowcase`).

### Real-Time FSM Engine

- **Input**: User Project Details (e.g., "Rewiring a house").
- **Process**: Lookup pricing rules in the FSM database.
- **Output**: Instant Estimate range.

### The Pool

- A shared data structure where un-converted leads are queued for redistribution.

---

## Relationship to BaseNative

- **BaseNative** is the UI/UX foundation for all Greenput-hosted sites.
- **Showcase**: Demonstrates the "Lead Intake -> Estimate -> Redemption" flow.
