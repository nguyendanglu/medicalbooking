## ADDED Requirements

### Requirement: Appointment Schedule Management
The system SHALL provide an interface for admins to view, approve, cancel, and manage doctor schedules across all branches.

#### Scenario: Admin confirms booking
- **WHEN** an admin clicks "Confirm" on a pending appointment
- **THEN** the system updates the status to Confirmed and notifies the patient

### Requirement: CRM and Patient Histories
The system SHALL allow staff to search and view user profiles, including contact info and past visitation history.

#### Scenario: Admin views patient history
- **WHEN** the admin searches a patient by phone number and clicks their profile
- **THEN** the system displays all past appointments and basic CRM notes

### Requirement: Content Management System (CMS)
The system SHALL include a CMS for managing doctors' profiles, services, prices, blog posts, and banners.

#### Scenario: Admin updates service price
- **WHEN** the admin navigates to the CMS, alters a service's price, and clicks "Save"
- **THEN** the system updates the price globally for all future bookings

### Requirement: Reporting and Analytics
The system SHALL present dashboards showing key metrics like appointment volumes, revenue, and website traffic.

#### Scenario: Admin generates revenue report
- **WHEN** the admin accesses the Reports section and filters by current month
- **THEN** the system displays aggregate charts showing completed bookings and total revenue
