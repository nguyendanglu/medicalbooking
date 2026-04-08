# Design: Integrate User Registration

## Context

The Medical Booking portal features a high-fidelity registration UI, but lacks the logic to persist data. The NestJS backend provides the necessary `AuthModule` with registration and login logic powered by Prisma and bcrypt, which is currently unused by the frontend.

## Goals / Non-Goals

**Goals:**
- Connect the `RegisterPage` form to the backend `@Post('auth/register')` endpoint.
- Implement form state management (Họ, Tên, Email, Mật khẩu).
- Handle API responses: show success/error notifications.
- Enable navigation to the Login page after successful registration.
- Verify that registered users can successfully authenticate via the Login page.

**Non-Goals:**
- Complex client-side validation libraries (stick to basic form logic).
- Email confirmation workflows.
- Password reset functionality.

## Decisions

- **API Integration**: Use a centralized API utility or direct `fetch` calls in the `RegisterPage` to communicate with the NestJS server (port 3000).
- **State Management**: Use React's `useState` for form fields and submission status.
- **User Experience**: Show a loading state during registration and clear success/error messages using the existing UI patterns.
- **Security Check**: Confirm the server correctly enforces email uniqueness and secure password hashing via the existing `bcrypt` implementation.

## Risks / Trade-offs

- **CORS**: Ensure the NestJS server allows requests from the portal (port 3001).
- **Validation Consistency**: Ensure frontend field names match the backend's expected DTO structure.
