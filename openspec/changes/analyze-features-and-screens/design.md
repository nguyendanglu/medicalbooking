## Context

The Medical Booking system (Smart Clinic) needs to support multiple user roles (individuals, businesses, and staff) and integrate various smart features like Electronic Health Records (EHR) and Telemedicine. The current state is defining the technical blueprint from the high-level business requirements gathered in `project.md`.

## Goals / Non-Goals

**Goals:**
- Provide a clear mapping of user flows to distinct screens.
- Define a scalable architecture capable of supporting core booking, telemedicine, and EHR securely.
- Ensure the separation of concerns between public-facing pages, authenticated patient portals, and admin management tools.

**Non-Goals:**
- Defining exact database schemas or technology stacks at this stage.
- Designing the physical UI layout (colors, exact pixel spacing).

## Decisions

- **Unified Backend / Separate Frontend Portals:** We will maintain a single API backend (monolith or microservices) but expose distinct frontend entry points: one for the marketing site / patient portal (Mobile-First Web App), and one for the internal admin dashboard (Desktop Web App).
  - *Rationale*: Separation reduces cognitive load for users and keeps security boundaries strict for the admin tools.
- **Phased Implementation boundaries:** Adhere strictly to the 3-phase rollout mentioned in requirements, starting with the landing page and basic booking form, deferring EHR and pharmacy to later specs.
  - *Rationale*: Delivers value early and isolates complex integrations (like Telemedicine) to later cycles.

## Risks / Trade-offs

- **Security Compliance for EHR** -> Mitigation: Ensure data encryption in transit and at rest from day one, design data access layers to strictly validate user roles.
- **Complex UI for Booking Engine handling real-time availability** -> Mitigation: Use simplified calendar UI components and aggressive caching with short TTL for availability slots.
