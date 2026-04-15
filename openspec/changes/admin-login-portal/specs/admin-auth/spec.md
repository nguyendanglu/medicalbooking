## ADDED Requirements

### Requirement: Administrative User Login
The system SHALL provide a secure login endpoint and interface for users with administrative roles (STAFF, DOCTOR, ADMIN).

#### Scenario: Successful Administrator Login
- **WHEN** user provides valid credentials for an account with the role ADMIN
- **THEN** system generates a secure JWT and redirects them to the Admin Dashboard

#### Scenario: Successful Doctor Login
- **WHEN** user provides valid credentials for an account with the role DOCTOR
- **THEN** system generates a secure JWT and redirects them to the Clinic Management view

#### Scenario: Invalid Credentials
- **WHEN** user provides incorrect email or password
- **THEN** system displays "Invalid credentials" error and denies access

#### Scenario: Unauthorized Role
- **WHEN** user provides valid credentials for an account with the role PATIENT
- **THEN** system displays "Access Denied: Administrative privileges required" and denies access to the admin portal

### Requirement: Secure Session Management
The system MUST persist the administrative session securely across page refreshes.

#### Scenario: Valid Session Persistence
- **WHEN** an authenticated admin refreshes the dashboard page
- **THEN** system validates the existing session and maintains the view without requiring re-login

#### Scenario: Expired Session
- **WHEN** user attempts to access an admin route with an expired JWT
- **THEN** system redirects them to the login page with a message "Session expired, please log in again"
