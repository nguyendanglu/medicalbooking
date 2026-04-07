## ADDED Requirements

### Requirement: Electronic Health Records (EHR) View
The system SHALL allow authenticated patients to view their lab results, ultrasound images, and prescriptions.

#### Scenario: Patient views test results
- **WHEN** the authenticated patient navigates to the "My Health Records" section
- **THEN** the system displays a list of past visits and associated test results/prescriptions

### Requirement: Remote Consultation
The system SHALL provide an interface for patients to engage in a live chat or video call with a doctor.

#### Scenario: Patient starts video call
- **WHEN** the patient clicks "Join Consultation" at the scheduled telemedicine time
- **THEN** the system initiates a secure WebRTC video session with the assigned doctor

### Requirement: Online Pharmacy (E-commerce)
The system SHALL feature an online pharmacy where patients can purchase prescribed medications or supplements and request fast delivery.

#### Scenario: Patient orders a supplement
- **WHEN** the patient adds a health supplement to their cart and completes checkout
- **THEN** the system creates a delivery order and updates the pharmacy inventory
