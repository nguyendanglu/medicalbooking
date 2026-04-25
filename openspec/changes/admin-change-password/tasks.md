## 1. Backend Preparation

- [x] 1.1 Review existing `AuthService` in `apps/server` to identify if a password update endpoint exists.
- [x] 1.2 Implement `PATCH /auth/change-password` in the server-side Auth Controller.
- [x] 1.3 Add password hashing and verification logic to ensure the "Current Password" is correct before updating.
- [x] 1.4 Create a Zod/Class-validator schema to enforce password complexity (min 8 chars, uppercase, lowercase, number).

## 2. Frontend Routing and Layout

- [x] 2.1 Create the directory `apps/admin/src/app/settings/change-password`.
- [x] 2.2 Implement a basic `page.tsx` that uses the Admin Portal's shell (sidebar and top bar). Refer to `admin_change_password.html` file for the design tokens and layout.
- [x] 2.3 Update the `nav` element in the sidebar to correctly link the "Settings" item to `/settings/change-password`.
- [x] 2.4 Design the page header with breadcrumbs and a clear "Security Settings" title.

## 3. Change Password Form Implementation

- [x] 3.1 Create a `ChangePasswordForm` component using `react-hook-form`.
- [x] 3.2 Define a Zod schema for client-side validation, including the "passwords must match" check.
- [x] 3.3 Implement the UI using the project's design tokens: glassmorphism cards, premium input fields, and Material Symbols.
- [x] 3.4 Add "Show/Hide" toggles for the password fields to improve user accessibility.

## 4. Integration and Polish

- [x] 4.1 Connect the form to the backend API using an authenticated fetch or Axios instance.
- [x] 4.2 Implement clear toast notifications for "Success" and "Error" states.
- [x] 4.3 Add the "Security Logout" logic: automatically clear authentication tokens and redirect to `/login` upon success.
- [x] 4.4 Final pass on accessibility (ARIA labels) and responsive behavior for mobile/tablet views.
