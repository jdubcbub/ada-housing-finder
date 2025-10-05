# 🏠 ADA Housing Finder v2 – Product Requirements Document (PRD)

## 1. Executive Summary
**ADA Housing Finder v2** is a web and mobile app that connects people seeking ADA-compliant housing with property managers, landlords, and agencies listing accessible units.  

The app’s mission is to provide a **trusted, centralized marketplace** for ADA-compliant rentals and homes, reducing the friction people face when searching for verified accessible housing.

---

## 2. Goals & Objectives

### 🎯 Primary Goal
Deliver an intuitive and reliable search platform for ADA-compliant housing listings.

### 📈 Objectives
- Reduce the time it takes to find accessible housing.
- Increase visibility for landlords with verified ADA units.
- Build trust through verified accessibility data.
- Enable direct communication between users and landlords.

---

## 3. User Personas

### 👩‍🦽 Renters / Buyers with Accessibility Needs
**Needs:**
- A reliable, fast way to find housing that meets accessibility standards.  

**Pain Points:**
- Limited availability of accessible units.
- Scattered information across multiple sites.
- Outdated or **incorrect info in listings** (units marked accessible but aren’t).

---

### 🏢 Landlords / Property Managers
**Needs:**
- Easy way to promote ADA-compliant units to the right audience.  

**Pain Points:**
- Hard to reach target tenants.
- Lack of compliance visibility or verification tools.

---

### 🏛️ Advocacy Groups / Housing Agencies (Secondary)
**Needs:**
- Centralized, up-to-date data for community programs.  

**Pain Points:**
- Lack of aggregated, reliable accessibility data.

---

## 4. Core Features

### 🚀 MVP (v1) – Existing Foundation
- User registration/login (renters & landlords).
- Searchable listings database.
- Filter by ADA features (e.g., roll-in shower, ramp, elevator).
- Basic landlord dashboard to post units.

### 🌟 v2 Enhancements (This PRD Scope)
- **Verification System:** badges for verified ADA-compliant listings.
- **Advanced Search & Filters:** by location, budget, amenities, ADA features.
- **Saved Searches & Alerts:** personalized notifications.
- **Landlord Tools:** analytics for views and leads.
- **Chat / Messaging System:** renters ↔ landlords.
- **Mobile-First UI:** responsive, WCAG 2.1 AA-compliant design.
- **Map View:** location-based search interface.
- **Integration:** Supabase backend + Google Sheets connector for rapid updates.

---

## 5. Non-Functional Requirements (NFRs)

| Category | Requirement |
|-----------|--------------|
| **Accessibility** | WCAG 2.1 AA compliance for UI. |
| **Performance** | < 2s response time for listing searches. |
| **Scalability** | Support 50K+ concurrent users. |
| **Data Security** | GDPR & CCPA compliant; encrypted PII. |
| **Reliability** | 99.9% uptime. |
| **Maintainability** | Modular React architecture, TypeScript strict mode. |

---

## 6. Success Metrics (KPIs)

| Metric | Description | Target |
|---------|--------------|--------|
| ⏱️ Time to find a unit | Avg. time from search → contact | ↓ 30% |
| 🏷️ Verified listing ratio | Verified vs. unverified ADA units | ≥ 75% |
| 👥 Monthly Active Users | Engaged renters & landlords | +20% MoM |
| 🔄 Conversion rate | Searches → contacts → leases | ≥ 10% |
| ⭐ User satisfaction (NPS) | “Would you recommend?” score | +50 NPS |

---

## 7. Competitive Analysis

| Platform | Strengths | Weaknesses |
|-----------|------------|-------------|
| **Zillow / Apartments.com** | Broad reach, familiar UI | Poor ADA filters, unreliable accessibility data |
| **Craigslist** | High visibility | Unverified, no filtering |
| **Nonprofit ADA databases** | Trustworthy data | Fragmented, outdated |
| **ADA Housing Finder v2** | Centralized, verified, modern, accessible | Requires community adoption |

---

## 8. Risks & Assumptions

### ⚠️ Risks
- Difficulty verifying ADA compliance (risk of misrepresentation).  
- **Incorrect or misleading listing information.**  
- Slow adoption by landlords.  
- Stale or outdated data.  

### ✅ Assumptions
- Users are comfortable searching online.  
- Advocacy groups may assist with verification or listings.  
- Mobile is the primary usage platform.

---

## 9. Roadmap & Phases

| Phase | Timeline | Key Deliverables |
|--------|-----------|------------------|
| **Phase 1** | 3–6 months | Verified listings, advanced filters, saved searches. |
| **Phase 2** | 6–12 months | Messaging, landlord analytics, map view. |
| **Phase 3** | 12–18 months | AI-powered recommendations, government data integrations, premium subscription tier. |

---

## 10. Appendices

### 📚 Glossary
- **ADA:** Americans with D

