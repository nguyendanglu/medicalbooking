## Context

The `techstack.md` specifies Next.js, Tailwind, TypeScript, TanStack Query for frontend, and NestJS for backend. We need to scaffold these and ensure they are ready for feature implementation.

## Goals / Non-Goals

**Goals:**
- Create a clear separation between Patient and Admin frontends.
- Setup a scalable NestJS backend.
- Ensure all projects use TypeScript and consistent styling with Tailwind.

**Non-Goals:**
- Complex inter-project monorepo setup (e.g., Turborepo/Nx) unless specifically requested later. We will start with a simple directory-based separation.
- Database migrations or external service integrations (Supabase/Auth0) at this exact step (will be done in subsequent changes).

## Decisions

- **Direct initialization:** Using official CLI tools (`create-next-app` and `@nestjs/cli`) to ensure best practices and latest stable versions.
- **Directory Structure:**
  - `server/`: Backend NestJS.
  - `apps/portal/`: Patient Portal.
  - `apps/admin/`: Admin Dashboard.
  - *Rationale*: Keeps concerns separated and allows independent deployment.

## Risks / Trade-offs

- **Dependency Overlap** -> Mitigation: Keep dependencies documented in `techstack.md`.
- **Consistency** -> Mitigation: Use the same Tailwind configuration principles for both frontend apps.
