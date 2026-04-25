## Why

Security and user autonomy are paramount for the Admin Portal. Allowing administrators to securely change their own passwords without manual database intervention ensures better security practices and reduces administrative overhead. It aligns with modern security standards and provides a seamless way for staff to manage their credentials.

## What Changes

- **Change Password Screen**: A new dedicated screen in the Admin Portal accessible via Settings.
- **Secure Password Form**: Implementation of a form requiring the current password, a new password, and a confirmation of the new password.
- **Form Validation**: Real-time validation for password strength, matching confirmation, and required fields.
- **Backend Integration**: Connecting the frontend form to the administrative authentication service for secure password updates.
- **Feedback System**: Clear success and error notifications using the project's premium design system.
- **Navigation Update**: Adding a link to the Change Password screen in the Admin sidebar/settings.

## Capabilities

### New Capabilities
- `admin-security`: This capability covers all security-related features for the administrative portal, starting with password management. It defines the security requirements for staff access.

### Modified Capabilities
None.

## Impact

- **Admin Frontend**: New route at `/settings/change-password` and associated UI components.
- **Admin Backend**: Verification of existing password update endpoints or implementation of a new one in the auth controller.
- **User Experience**: Improved security and self-service capabilities for clinic staff.
