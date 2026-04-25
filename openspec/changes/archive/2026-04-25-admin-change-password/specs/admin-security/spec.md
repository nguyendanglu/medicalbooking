## ADDED Requirements

### Requirement: Admin can access Change Password screen
The system SHALL provide a dedicated route and UI for administrators to initiate a password change.

#### Scenario: Navigating from Sidebar
- **WHEN** an authenticated administrator clicks on the "Settings" link in the sidebar
- **THEN** the system SHALL navigate to the Settings page or directly to the Change Password screen
- **AND** the UI SHALL maintain consistency with the Admin Portal's "The Clinical Editorial" layout

### Requirement: Secure Password Form Fields
The Change Password form SHALL include fields for "Current Password", "New Password", and "Confirm New Password".

#### Scenario: Form Presence
- **WHEN** the user is on the Change Password screen
- **THEN** the system SHALL display three secure text input fields (masked) and a "Update Password" button

### Requirement: Password Validation
The system SHALL validate the new password against strength requirements and ensure it matches the confirmation field.

#### Scenario: Mismatched Passwords
- **WHEN** the user enters different values in "New Password" and "Confirm New Password"
- **THEN** the system SHALL display a validation error message "Passwords do not match"
- **AND** the "Update Password" button SHALL be disabled or return an error on click

#### Scenario: Weak Password
- **WHEN** the user enters a password that does not meet complexity requirements (minimum 8 characters, at least one uppercase letter, one lowercase letter, and one number)
- **THEN** the system SHALL display a descriptive validation error explaining the requirements

### Requirement: Successful Password Update
The system SHALL securely transmit the password update request to the backend and provide clear feedback on success.

#### Scenario: Valid Input and Correct Current Password
- **WHEN** the user submits the form with valid data and the correct current password
- **THEN** the system SHALL display a success notification "Password updated successfully"
- **AND** the form fields SHALL be cleared

### Requirement: Invalid Current Password
The system SHALL handle cases where the provided current password is incorrect.

#### Scenario: Incorrect Current Password
- **WHEN** the user submits the form with an incorrect current password
- **THEN** the system SHALL display an error message "The current password you entered is incorrect"
- **AND** the password SHALL NOT be updated
