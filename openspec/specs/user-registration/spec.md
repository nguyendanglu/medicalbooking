## ADDED Requirements

### Requirement: Patient Registration
The portal shall allow new users to register by providing their personal information.

#### Scenario: Successful Registration
- **WHEN** a user fills out the name, email, and password fields and clicks "Đăng ký ngay"
- **THEN** an account is created in the database, and the user is redirected to the login page with a success notification.

#### Scenario: Duplicate Email Prevention
- **WHEN** a user attempts to register with an email already present in the system
- **THEN** the server returns a conflict error, and the portal displays "Email already exists".

#### Scenario: Password Security
- **WHEN** a user submits a registration form
- **THEN** the password must be stored as a cryptographically secure hash in the database, never as plain text.

### Requirement: Account Accessibility
Newly registered users must be able to immediate authenticate with their credentials.

#### Scenario: Post-Registration Login
- **WHEN** a user registers successfully and navigates to the login page
- **THEN** they can enter their just-created email and password to access the portal dashboard.
