## Context

The `apps/admin` application currently has a mockup login screen that bypasses authentication and redirects directly to the `/dashboard`. To ensure secure access for clinic staff, doctors, and administrators, a real authentication flow must be implemented, leveraging the existing backend `auth` module and Prisma `User` model.

## Goals / Non-Goals

**Goals:**
- Implement a secure authentication flow using JWT.
- Protect `/dashboard` and other admin routes from unauthenticated access.
- Support role-based access control (RBAC) to distinguish between STAFF, DOCTOR, and ADMIN.
- Provide clear error messaging for invalid credentials.

**Non-Goals:**
- Implementing OAuth2 (Social Login) for the admin portal in this phase.
- Implementing Multi-Factor Authentication (MFA).

## Decisions

- **Use Next.js Middleware for Route Protection**: This ensures that all requests to sensitive admin routes are intercepted and validated before rendering.
- **Extend Backend Auth Service**: The existing `auth.service.ts` will be used to validate credentials and generate roles. We will ensure the `role` field in the `User` table is correctly utilized.
- **Client-Side State Management**: Use a cookie-based session strategy for Next.js compatibility and security (HttpOnly).
- **Aesthetic Refinement**: Maintain the premium design already present in the mockup while adding loading states and validation feedback.

## Risks / Trade-offs

- [Token Leakage] → Use `HttpOnly` cookies to store JWTs to prevent XSS-based token theft.
- [Role confusion] → Explicitly validate that the user logging into the admin portal has a role other than `PATIENT`.
