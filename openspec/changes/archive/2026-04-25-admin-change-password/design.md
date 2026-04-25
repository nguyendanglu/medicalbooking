## Context

The Admin Portal ("The Clinical Editorial") provides a comprehensive interface for clinic management but currently lacks a self-service mechanism for staff to manage their security credentials. Password updates are handled manually or through administrative intervention. This change introduces a secure, integrated screen for users to change their own passwords within the portal.

## Goals / Non-Goals

**Goals:**
- **Secure Self-Service**: Enable staff to update passwords without assistance.
- **Design Alignment**: Ensure the UI matches the premium "The Clinical Editorial" aesthetic (glassmorphism, dark mode support, Material Symbols).
- **Security Best Practices**: Require the current password to prevent unauthorized changes during an active session and enforce strength requirements.
- **Session Management**: Properly handle session state after a successful password change.

**Non-Goals:**
- **Forgot Password Flow**: Implementing email-based recovery is not part of this task.
- **Admin Management of Others**: This screen is specifically for the currently logged-in user's account.
- **Multi-Factor Authentication (MFA)**: Setup for MFA is out of scope for this initial security improvement.

## Decisions

1. **Routing Strategy**: Implement the screen at `/settings/change-password`.
   - *Rationale*: Grouping security settings under a "Settings" top-level route follows standard UX patterns and allows for future expansion of user preferences.
2. **Form Architecture**: Use `react-hook-form` with `zod` schema validation.
   - *Rationale*: Provides a declarative way to handle complex validation rules (matching passwords, complexity requirements) and ensures type safety throughout the component.
3. **Backend Integration**: Implement a `PATCH /auth/change-password` endpoint.
   - *Rationale*: Uses the semantic `PATCH` for partial resource updates. The endpoint must verify the `currentPassword` against the stored hash before applying the update.
4. **Security - Session Invalidation**: Force logout after a successful password change.
   - *Rationale*: Standard security practice to ensure all existing sessions (potentially on other devices) are invalidated and the user confirms they know the new credential.
5. **UI Components**: Reuse the `GlassCard` and input patterns from the Admin Dashboard.
   - *Rationale*: Maintains the premium feel and brand consistency established in the initial portal design.

## Risks / Trade-offs

- **[Risk] Account Lockout** → **[Mitigation]** Provide clear validation feedback and ensure the "Current Password" check is performed before any state changes.
- **[Risk] Session Conflict** → **[Mitigation]** Clear all local storage/cookies and redirect to `/login` immediately upon success with a descriptive message.
- **[Trade-off] Client-side vs Server-side Strength Validation** → **Decision**: Implement both. Client-side for instant feedback, server-side for absolute security enforcement.
