# Greenput: Business Breakdown

## One-liner

Greenput is a consent-backed lead intake and data portability platform that allows businesses to collect user information from paid traffic **without cookie banners**, while giving users full control over where their data goes.

---

## The problem

The modern web treats consent as a UI negotiation instead of a property of intent.

Businesses are forced to:

- block content with cookie banners
- degrade conversion on paid traffic
- rely on dark patterns to remain competitive
- store user data in closed systems users cannot move away from

Users are forced to:

- make abstract decisions about “analytics” and “personalization”
- accept tracking unrelated to their immediate goal
- surrender data with no clear portability or ownership

This has produced a broken equilibrium where everyone complies with the _letter_ of GDPR and CCPA while violating the _spirit_ of user autonomy.

---

## The thesis

Consent does not need a banner.

When a user arrives with intent and performs a deliberate action, consent can be:

- specific
- scoped
- provable
- portable

Greenput treats **user action itself** as the consent event, not a pop-up negotiation layered on top of unrelated tracking.

If consent is tied to purpose, data collection becomes ethical by construction and banners become unnecessary.

---

## Primary use case: Paid traffic lead intake

Greenput is designed for SMBs sending paid traffic to purpose-built landing experiences.

In this model:

- A user arrives to complete a specific task (request a quote, submit contact info, start a trial).
- Only the data required for that task is collected.
- There is no ambient tracking, profiling, or background analytics.
- Consent is embedded inline as part of the interaction, not negotiated separately.

Examples:

- “Request a quote” form
- “Contact an electrician” intake
- “Get a callback” landing page
- “Start a free evaluation” flow

The lead submission itself becomes a **first-class consent event**, with:

- a declared purpose
- explicit data categories
- a defined retention window
- a generated consent receipt

No cookie banner is required because no speculative data collection exists.

---

## User-controlled data portability

A core differentiator of Greenput is that users are never trapped.

Greenput supports:

- exporting submitted data and consent receipts in portable formats
- proving consent independently of the original business
- redirecting future submissions to a different provider
- revoking access without losing personal records

Greenput is not a data silo.

It is a **routing and verification layer** that allows users to move their data while businesses retain provable consent.

---

## Target customers

### Primary

- SMBs running paid search, social, or display ads
- Service businesses collecting inbound leads
- Companies that want higher conversion without compliance risk

### Secondary

- Platforms embedding lead capture for partners
- Regulated organizations needing audit-grade consent
- Teams migrating away from dark-pattern consent vendors

---

## Core value proposition

For businesses:

- Higher conversion on paid traffic
- No cookie banner UX tax
- Clean consent receipts for compliance
- Simple integration into landing pages and apps

For users:

- No forced pop-ups
- Clear explanation of what data is collected and why
- Proof of consent they can keep
- Ability to move or revoke their data later

---

## Product pillars

### 1. Consent through intent

- Consent is expressed by deliberate action
- No bundled purposes
- No background tracking
- No abstract toggles unrelated to the task

### 2. Consent as a domain model

- Explicit purposes
- Explicit data categories
- Explicit processors
- Explicit retention periods
- Versioned, immutable consent receipts
- Revocation with history

### 3. Enforcement, not theater

- No data is stored or emitted without a valid consent state
- Runtime guards prevent accidental leakage
- Downstream systems receive data only after verification

### 4. Portability by default

- Exportable receipts and data
- Provider-agnostic verification
- Designed to let users leave without penalty

---

## Differentiation

Most consent platforms:

- optimize opt-in rates
- rely on coercive UI
- trap data behind vendors
- exist to satisfy compliance checklists

Greenput:

- optimizes clarity and trust
- eliminates banners by design
- treats consent as infrastructure
- makes data portable instead of sticky

Greenput is not a “compliance layer.”  
It is a **consent operating system for lead intake**.

---

## Business model options

- SaaS pricing per domain or per landing experience
- Tiered plans based on receipt retention depth
- Per-seat pricing for internal compliance teams
- Enterprise plans for custom policies, residency, and integrations

---

## Go-to-market wedge

Start with SMBs already paying for traffic.

Replace:

- cookie banners
- brittle form plugins
- questionable analytics setups

With:

- a single ethical intake layer
- provable consent
- better conversion
- lower compliance risk

---

## Success metrics

- Lead conversion lift vs banner-based flows
- Time-to-understand vs time-to-submit parity
- Successful data exports and transfers
- Reduction in compliance incidents
- Integration time for new landing pages

---

## Non-goals

- Maximizing opt-in conversion at all costs
- Passive tracking or behavioral profiling
- Rebuilding traditional cookie consent banners
- Becoming a data broker or analytics vendor

---

## Relationship to BaseNative and Artafects

- BaseNative provides the UI and monorepo enforcement layer.
- Greenput handles consent and ethical data intake.
- Artafects handles long-lived memory and user-owned artifacts built on top of consented data.

Greenput defines **how data enters the system**.
