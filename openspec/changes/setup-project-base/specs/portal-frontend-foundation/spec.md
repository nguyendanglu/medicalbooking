## ADDED Requirements

### Requirement: Next.js Patient Portal Setup
The system SHALL have a Next.js frontend initialized in `apps/portal` with TypeScript, Tailwind CSS, and App Router.

#### Scenario: Verify Portal Initialization
- **WHEN** the command `npm run dev` is executed in `apps/portal`
- **THEN** the Next.js server starts successfully and is accessible on a local port (e.g., 3001)
