## ADDED Requirements

### Requirement: Appointment Dashboard Layout
The system SHALL provide a dedicated dashboard for users to view their medical appointments, accessible via a prominent navigation link.

#### Scenario: Navigating to the appointments dashboard
- **WHEN** the authenticated user clicks on the "My Appointments" link in the sidebar or menu
- **THEN** the system displays the appointment dashboard with a "Upcoming" tab selected by default

### Requirement: Tabbed Status Filtering
The system SHALL allow users to switch between "Upcoming" and "History" views using a tabbed interface.

#### Scenario: Viewing upcoming appointments
- **WHEN** the user selects the "Upcoming" tab
- **THEN** the system displays appointments with status `PENDING`, `CONFIRMED`, or `IN_PROGRESS`
- **AND** orders them by date ascending (soonest first)

#### Scenario: Viewing appointment history
- **WHEN** the user selects the "History" tab
- **THEN** the system displays appointments with status `COMPLETED`, `CANCELED`, or `MISSED`
- **AND** orders them by date descending (most recent first)

### Requirement: Detailed Appointment Card
The system SHALL display individual appointments as rich cards containing the doctor's name, their specialty, the appointment date and time, the clinic location, and a colored status badge.

#### Scenario: Displaying appointment details
- **WHEN** an appointment is rendered in the list
- **THEN** it MUST show the doctor's full name and profile image (if available)
- **AND** it MUST show the specialty (e.g., Cardiology, General Practice)
- **AND** it MUST show the formatted date (e.g., April 15, 2024 at 10:00 AM)
- **AND** it MUST show the status with a corresponding visual theme (e.g., Green for Confirmed, Yellow for Pending, Grey for Canceled)

### Requirement: Quick Booking CTA
The system SHALL provide a prominent "Schedule New Appointment" button on the dashboard to facilitate quick booking.

#### Scenario: Initiating a new booking
- **WHEN** the user clicks the "Schedule New Appointment" button
- **THEN** the system navigates the user to the multi-step booking wizard (/booking)
