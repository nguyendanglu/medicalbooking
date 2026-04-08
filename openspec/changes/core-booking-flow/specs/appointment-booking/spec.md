## ADDED Requirements

### Requirement: Service Selection
The system SHALL display a list of available service types and allow the user to select one as the first step of the booking process.

#### Scenario: User selects a service
- **WHEN** the user navigates to the booking screen and clicks on a specific service type
- **THEN** the system stores the selected service ID and proceeds to the doctor selection step

### Requirement: Doctor Selection
The system SHALL fetch and display a list of available doctors for the user to choose from.

#### Scenario: User selects a doctor
- **WHEN** the user is on the doctor selection step and selects a specific doctor
- **THEN** the system stores the selected doctor ID and proceeds to the date and time selection

### Requirement: Date and Time Slot Selection
The system SHALL present a calendar/date picker along with available time slots for the chosen doctor.

#### Scenario: User selects date and time
- **WHEN** the user picks a date and clicks an available time slot
- **THEN** the system stores the selected date and time slot and proceeds to patient information entry

### Requirement: Patient Information Entry
The system SHALL provide a form to capture the patient's name, phone number, and reason for the visit.

#### Scenario: User fills out patient info
- **WHEN** the user correctly fills out the form fields
- **THEN** validation passes and the user can review and finalize the booking

#### Scenario: User leaves required fields empty
- **WHEN** the user attempts to proceed without filling required fields (name, phone, reason)
- **THEN** the system displays validation error messages and prevents submission

### Requirement: Booking Submission
The system SHALL submit the aggregated booking details to the backend to create the appointment database record.

#### Scenario: Successful booking creation
- **WHEN** the frontend submits a valid payload to `POST /api/appointments`
- **THEN** the backend persists the record in the `Appointment` table and returns a success response with the new appointment ID, leading the user to a success confirmation screen
