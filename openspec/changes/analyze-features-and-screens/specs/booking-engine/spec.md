## ADDED Requirements

### Requirement: Appointment Booking Form
The system SHALL allow users to book appointments by selecting "At Clinic" or "Home Visit", choosing a specialty, doctor, and an available real-time time slot, and filling out personal details.

#### Scenario: Successful Clinic Booking
- **WHEN** the user selects "At Clinic", chooses a doctor, a valid slot, fills their details, and submits
- **THEN** the system reserves the slot and sends an SMS/Email confirmation

#### Scenario: Successful Home Visit Booking
- **WHEN** the user selects "Home Visit", provides their address and preferred time slot
- **THEN** the system logs the request for admin dispatch and sends an SMS/Email confirmation

### Requirement: Payment Integration
The system SHALL allow users to pay for their bookings or services using Momo, VNPay, or Credit Card.

#### Scenario: User pays via Momo
- **WHEN** the user selects Momo as the payment method for a booking
- **THEN** the system redirects to the Momo payment gateway and confirms the booking upon successful payment webhook response
