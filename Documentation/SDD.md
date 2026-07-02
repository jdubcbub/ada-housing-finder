<!-- FOR REVIEW / REVISION -->

# Software Design Document (SDD)
## ADA Housing Finder v2

**Status:** Draft  
**Scope:** Current Lovable-derived prototype + target scalable architecture  
**Audience:** Engineering, Product, Design, QA, DevOps  
**Version:** 0.1<br />
**Last Updated:** 7/2/2026

---

## 1. Purpose

This document defines the software design for ADA Housing Finder v2.

It captures:
- the current prototype implementation,
- the target production architecture,
- and the migration path between the two.

This project is currently transitioning from a Lovable-generated frontend prototype into a scalable production system.

---

## 2. System Overview

### 2.1 Product Goal
ADA Housing Finder helps users discover housing with ADA-relevant accessibility features, starting with searchable listings and evolving toward a verified marketplace with alerts, messaging, and landlord tools.

### 2.2 Design Approach
This system will evolve in phases:

- **Phase 1:** Lovable prototype / frontend-first implementation
- **Phase 2:** Production backend and infrastructure hardening
- **Phase 3:** Marketplace features such as verification, messaging, saved searches, and analytics

### 2.3 Guiding Principles
- Accessibility-first
- Mobile-first
- Incremental migration
- Strong typing and testability
- Secure-by-default
- Clear separation of UI, domain, and infrastructure

---

## 3. Current State Analysis

### 3.1 What Exists Today
- React + TypeScript frontend
- Vite build tooling
- shadcn/ui / Tailwind UI foundation
- React Router
- TanStack Query
- Supabase data access
- Search bar + results grid + property cards
- Toast and alert-based error handling
- Vitest test setup
- Lovable scaffolding markers in README, config, and metadata

### 3.2 What the Current App Actually Does
- Accepts a neighborhood/location search query
- Queries Supabase `ada_units`
- Displays listing cards with ADA-related attributes
- Handles loading, empty, and error states
- Supports initial unit test scaffolding

### 3.3 What Is Not Yet Implemented
- Authentication
- Role-based access
- Messaging
- Saved searches
- Notifications
- Verification workflow
- Map view
- Landlord dashboard
- Custom backend/API service
- Cloud deployment architecture

---

## 4. Target Architecture

### 4.1 Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- React Router
- TanStack Query or equivalent data-fetching layer

### 4.2 Backend
- Node.js
- Express
- REST API
- Optional background jobs/worker processes
- Structured validation and authorization middleware

### 4.3 Infrastructure
- **Hosting:** Google Cloud Run
- **Database:** Cloud SQL (PostgreSQL)
- **File Storage:** Cloud Storage
- **Authentication:** Firebase Auth or Identity Platform
- **Secrets:** GCP Secret Manager
- **Monitoring:** Cloud Logging / Error Reporting / Trace

### 4.4 External Integrations
- Google Sheets ingestion/sync
- Maps/geocoding provider
- Email or SMS notification service
- Optional analytics pipeline

---

## 5. Scope Definition

### 5.1 In Scope for v2 Refactor
- Replace Supabase-only data dependency with backend API layer
- Establish production-ready cloud architecture
- Normalize core domain models
- Add authentication and role-based authorization
- Support listing verification
- Support messaging and notifications foundation
- Prepare deployment and CI/CD for production use

### 5.2 Out of Scope for Initial Refactor
- AI recommendation engine
- Premium subscription billing
- Full government data integrations
- Advanced landlord analytics beyond MVP metrics
- Large-scale multi-region architecture

---

## 6. Domain Model

### 6.1 Core Entities
- User
- Role
- Listing
- Unit
- AccessibilityFeature
- VerificationRecord
- Conversation
- Message
- SavedSearch
- Notification
- AuditEvent

### 6.2 Example Relational Model
| Entity | Purpose |
|---|---|
| Users | Authentication identity + user profile |
| Roles | Authorization scope |
| Listings | Parent housing listing |
| Units | Individual rentable units |
| AccessibilityFeatures | Structured ADA feature data |
| Verifications | Evidence and review state |
| Conversations | Messaging thread metadata |
| Messages | Chat contents |
| SavedSearches | User alert criteria |
| Notifications | Delivery records |
| AuditEvents | Compliance and traceability |

---

## 7. API Design

### 7.1 Principles
- RESTful and versioned
- JSON request/response
- Explicit auth requirements
- Clear validation and error contracts

### 7.2 Example Endpoints
| Method | Route | Purpose |
|---|---|---|
| GET | /api/v1/listings | Search listings |
| GET | /api/v1/listings/:id | Listing details |
| POST | /api/v1/listings | Create listing |
| PATCH | /api/v1/listings/:id | Update listing |
| POST | /api/v1/verifications | Submit verification |
| GET | /api/v1/searches | Retrieve saved searches |
| POST | /api/v1/messages | Send message |

### 7.3 API Concerns
- pagination
- filtering
- sorting
- validation errors
- auth errors
- rate limiting
- audit logging

---

## 8. Verification Workflow

### 8.1 Goal
Provide trustworthy signals about whether a listing actually meets ADA criteria.

### 8.2 Verification States
- UNVERIFIED
- PENDING_REVIEW
- VERIFIED
- REJECTED
- EXPIRED

### 8.3 Evidence Types
- landlord-submitted documentation
- photos
- inspection notes
- third-party verification
- administrative review comments

### 8.4 Implementation Notes
Verification may be handled through:
- an admin endpoint,
- a moderation dashboard,
- or a worker-backed review pipeline.

---

## 9. Messaging Design

### 9.1 Goals
Enable renters and landlords to communicate without exposing private contact details prematurely.

### 9.2 Architecture Options
- Socket.io for real-time delivery
- long-polling fallback
- queued notifications for offline users

### 9.3 Considerations
- spam prevention
- message retention
- moderation
- read/unread state
- attachment policy

---

## 10. Google Sheets Integration

### 10.1 Purpose
Support rapid importing or syncing of listing data from spreadsheet-based operational workflows.

### 10.2 Integration Pattern
- service account authentication
- scheduled sync job or on-demand import
- schema validation
- conflict resolution rules
- audit log for imported changes

### 10.3 Safety Constraints
- no direct public exposure of credentials
- no hardcoded sheet IDs in source
- environment-based configuration only

---

## 11. Frontend Design

### 11.1 Current UI Building Blocks
- SearchBar
- ResultsGrid
- PropertyCard
- Alerts/toasts
- Loading states
- Empty states

### 11.2 Target UI Expansion
- Authentication views
- Listing detail page
- Saved searches page
- Messaging UI
- Verification/admin interfaces
- Filter panels and map panels

### 11.3 Accessibility Requirements
- semantic HTML
- keyboard navigation
- skip links
- focus management
- ARIA only when necessary
- screen-reader testing
- color contrast compliance

---

## 12. Data Storage Strategy

### 12.1 Current Storage
- Supabase `ada_units` table

### 12.2 Target Storage
- PostgreSQL in Cloud SQL
- normalized relational schema
- generated or hand-maintained TypeScript types
- migration-based schema changes

### 12.3 Storage for Media
- Cloud Storage for listing photos and verification artifacts

---

## 13. Security & Privacy

### 13.1 Authentication
Use JWT-based auth via Firebase Auth or Identity Platform.

### 13.2 Authorization
Role-based permissions for:
- renters
- landlords
- admins
- verifiers

### 13.3 Privacy Requirements
- protect PII
- store only necessary personal data
- restrict verification documents
- avoid leaking internal credentials or identifiers in public docs

---

## 14. CI/CD and Environments

### 14.1 Branching Strategy
- `main` for production
- `develop` for integration
- feature branches for active work

### 14.2 Automation
- lint
- unit tests
- integration tests
- build validation
- deployment to Cloud Run

### 14.3 Environments
- local
- development
- staging
- production

---

## 15. Testing Strategy

### 15.1 Existing Coverage
- Vitest setup
- React Testing Library setup
- frontend unit test foundation

### 15.2 Required Coverage for Refactor
- API unit tests
- service-layer tests
- component tests
- integration tests
- accessibility tests
- contract tests for API responses

### 15.3 Quality Gates
- no merges without passing tests
- no deployment without build verification
- accessibility smoke checks for core user flows

---

## 16. Migration Plan

### 16.1 Phase 0: Baseline
Document the Lovable prototype and current behavior.

### 16.2 Phase 1: Backend Introduction
Introduce Node/Express API alongside existing frontend.

### 16.3 Phase 2: Data Migration
Move listing data from Supabase-first access into the new backend/database model.

### 16.4 Phase 3: Feature Expansion
Add verification, messaging, saved searches, and notifications.

### 16.5 Phase 4: Infrastructure Hardening
Add monitoring, rate limiting, security controls, and production deployment safeguards.

---

## 17. Risks and Decisions

| Risk | Impact | Mitigation |
|---|---|---|
| Architecture drift between prototype and target | High | Explicit current/target separation |
| Data model mismatch during migration | High | Versioned schema and migration plan |
| Accessibility regressions | High | Automated and manual testing |
| Scope creep | Medium | Phase-based delivery |
| Cloud cost / complexity | Medium | Start simple, scale incrementally |

---

## 18. Open Questions

- What data should remain in Supabase during migration?
  - A: The current test data.
- Will the backend replace Supabase entirely or sit in front of it temporarily?
  - A: Replace entirely.
- What is the authoritative source for accessibility verification?
- Will messaging be real-time from day one? NO
- Which cloud services are mandatory for v1 of the refactor? NONE
- What is the minimum feature set for launch?
  - A: Requires a meeting to map a critical E2E user journey

---

## 19. Decision Log

| Date | Decision | Rationale | Owner |
|---|---|---|---|
| TBD | Start from current Lovable prototype | Preserve working UI while refactoring safely | TBD |
| TBD | Use API-first backend for production | Improves maintainability and scale | TBD |
| TBD | Keep accessibility as a first-class requirement | Central to product mission | TBD |
