## Why

The Medical Booking portal requires a core booking flow to allow patients to seamlessly schedule medical appointments. Currently, users can explore the available services and doctors, but lack the ability to select a service type, choose a specific doctor, pick a real-time available slot, and input their patient information to finalize an appointment.

## What Changes

- Implement a comprehensive step-by-step booking interface encompassing: Service Selection, Doctor Selection, Date & Time Slot Selection, and Patient Information Entry.
- Fetch real-time slot selection based on doctor and date availability.
- Allow users to enter associated patient data and reasons for visit prior to finalizing the booking.
- Persist the newly created appointment record securely into the backend Neon PostgreSQL database.

## Capabilities

### New Capabilities
- `appointment-booking`: End-to-end functionality for patients to select services, choose doctors, pick an available time slot, and submit their personal/medical information to formally book an appointment.

### Modified Capabilities
- (None)

## Impact

- **Frontend (apps/portal)**: 
  - Creation of a new `/booking` screen with a multi-step form utilizing Next.js, React Hook Form, and Zod for validation.
  - New data fetching hooks/API calls to retrieve available doctors, services, time slots, and submit the booking request.
- **Backend (server)**:
  - New API endpoints in NestJS to expose static service types, doctors from the database.
  - New API endpoint to expose doctor availability (time slots).
  - New `Appointment` and potentially `Patient` Prisma models in the database schema.
  - New API route handling the mutation to create an appointment.
