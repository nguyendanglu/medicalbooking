## 1. Backend Authentication Setup

- [x] 1.1 Verify and enhance `AuthService` to return user roles in JWT payload
- [x] 1.2 Seed or create administrative test users (ADMIN, DOCTOR, STAFF) in the database
- [x] 1.3 Add a validation endpoint or utility to check administrative privileges

## 2. Frontend Login Implementation

- [x] 2.1 Update `LoginPage` component to use `api/auth/login` endpoint
- [x] 2.2 Implement robust error handling and loading states in the login form
- [x] 2.3 Store authenticated session in secure cookies
- [x] 2.4 Add a "Forgot Password" link that redirects to the portal's password reset page
- [x] 2.5 Temporarily lock the account (e.g., for 10 minutes) if the wrong password is entered more than 5 times in a row.

## 3. Route Protection & RBAC

- [x] 3.1 Create Next.js Middleware in `apps/admin` to intercept unauthorized requests
- [x] 3.2 Implement role-based redirection logic (e.g., redirect PATIENT to a forbidden page or back to portal)
- [x] 3.3 Ensure protected routes validation on the server side (SSR/API)

## 4. Verification & Polish

- [x] 4.1 Verify successful login and redirection for ADMIN role
- [x] 4.2 Verify successful login and redirection for DOCTOR role
- [x] 4.3 Verify rejection and error message for PATIENT role
- [x] 4.4 Test session persistence across page refreshes
