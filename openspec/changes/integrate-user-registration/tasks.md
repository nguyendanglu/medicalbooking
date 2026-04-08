## 1. Backend Verification & Security

- [ ] 1.1 Verify registration endpoint in `server/src/auth/auth.controller.ts` correctly receives data.
- [ ] 1.2 Confirm `AuthService.register` handles email conflicts and secure hashing.
- [ ] 1.3 Ensure the NestJS application has CORS enabled for the portal origin.

## 2. Portal Registration Flow

- [ ] 2.1 Bind form inputs (Họ, Tên, Email, Mật khẩu) to React state in `RegisterPage`.
- [ ] 2.2 Implement form submission handler and API request logic.
- [ ] 2.3 Handle and display API responses (loading, success, error).

## 3. Navigation and UX

- [ ] 3.1 Link the registration "Sign In" prompt to the `/login` route.
- [ ] 3.2 Implement automatic redirection to the login page upon successful registration.
- [ ] 3.3 Add basic client-side validation for password length and email format.

## 4. Verification

- [ ] 4.1 Test full registration flow from UI to Database.
- [ ] 4.2 Perform a test login with the newly created account to verify integration.
