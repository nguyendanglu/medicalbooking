# Proposal: Integrate User Registration

## Why

To allow new patients to create accounts and access the Medical Booking portal. Currently, there is a login flow but no way for new users to register their information, which is a critical gap for user onboarding.

## What Changes

- **Portal (Frontend)**: Realize the registration screen (already exists as a placeholder/design in the portal) and connect it to the backend.
- **Server (Backend)**: Create a `Post` endpoint for user registration, handle password hashing, and integrate with Prisma/Neon.
- **Authentication**: Ensure that upon successful registration, users can immediately (or subsequently) log in using their new credentials.

## Capabilities

### New Capabilities
- `user-registration`: Implementation of the full-stack flow for user signup, including form validation, API communication, and database persistence.

### Modified Capabilities
- `user-auth`: Potentially modified to ensure compatibility with newly registered users and consistent hashing strategies.

## Impact

- `apps/portal`: UI updates to the register screen, form state management, and API utility updates.
- `server`: New `AuthModule` or `UserModule` logic for handling registration requests.
- `database`: Interaction with the `User` table in the Neon PostgreSQL database via Prisma.
