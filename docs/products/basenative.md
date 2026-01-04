# BaseNative: Business Breakdown

## One-liner

BaseNative is an opinionated, semantic-HTML-first UI and application framework built for Angular and Nx monorepos, focused on correctness, accessibility, and scalable architecture.

## The problem

Frontends commonly rot into inconsistent components, inaccessible markup, scattered styling conventions, and one-off patterns. Teams ship fast but accumulate invisible debt: broken semantics, fragmented state management, and brittle builds.

## The thesis

If you make semantic HTML the default, accessibility non-negotiable, state explicit, and monorepo gates strict, you get a system that scales without turning into a junkyard.

## Target customers

- Product engineering teams building large Angular applications
- Organizations standardizing UI across multiple apps
- Teams that need Nx discipline, shared libraries, and testable patterns

## Core value proposition

- Semantic HTML is default, not optional
- Accessible components by construction
- Nx libraries structured for reuse and enforcement
- Clear state patterns (Angular Signals) and composable APIs
- Eliminates redundant abstraction while staying consistent

## Product pillars

1. Semantic-first component architecture
   - HTML meaning drives component design
   - Minimal wrappers, high clarity

2. Monorepo enforcement
   - Uniform linting, formatting, build, test gates
   - Shared tooling and generators
   - Systemic fixes over patchwork

3. Design system friendliness
   - Token-driven styling
   - Avoids inline styles by default
   - Supports clean theming and consistent spacing/typography

4. State and data clarity
   - Signals-based state patterns
   - Predictable boundaries between UI, data access, and domain logic

## Differentiation

- BaseNative is not a component dumping ground. It is a framework of constraints designed to keep teams from lying to themselves about maintainability.

## Business model options

- Open core with paid enterprise templates, generators, and support
- Consulting and implementation packages for large orgs
- Paid “system hardening” engagements for monorepo discipline

## Relationship to Greenput and Artafects

- BaseNative is the foundation and delivery vehicle for Greenput UI.
- BaseNative can also power Artafects frontends and internal tooling.

## Success metrics

- Build and test stability over time
- Accessibility conformance improvements
- Component reuse rate
- Reduction in one-off UI and state patterns
- Faster onboarding and fewer regressions

## Non-goals

- Being framework-agnostic at all costs
- Fancy abstractions that hide HTML meaning
- Infinite customization that destroys consistency
