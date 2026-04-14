## Context

The Medical Booking portal features a database configured with `doctors`, `service_types`, and `time_slots`, and complete user authentication. However, there is no end-to-end mechanism allowing patients to actually book medical appointments. The newly proposed `appointment-booking` capability will bridge this gap, allowing a unified frontend wizard to collect patient input and specific selections (service, doctor, time slot) and submit it to a new backend module that persists the appointment securely to the Neon database.

## Goals / Non-Goals

**Goals:**
- Provide a responsive, multi-step booking UI (`/booking`) incorporating:
   1. Service selection
   2. Doctor selection
   3. Date and Time Slot selection
   4. Patient details and clinical reason input
- Introduce backend API endpoints to fetch necessary catalog data (`doctors`, `service_types`, `time_slots`).
- Introduce a secure POST endpoint in the NestJS backend to accept and validate the new booking.
- Design and migrate an `Appointment` model in the Prisma schema.

**Non-Goals:**
- Preventing concurrent double-booking of a doctor's slot is out of scope for this initial MVP.
- Integrating payment gateways or invoicing logic at the time of booking.
- Managing doctor approval or declining workflows (all bookings are assumed confirmed for now).

## Decisions

- **Frontend State Management:** The `/booking` flow will use a client-side multi-step wizard, potentially powered by `React State` or `React Hook Form`. State will be aggregated locally and then submitted in a single payload at the very end to minimize partial server-side state.
- **Backend Architecture:** A dedicated `AppointmentsModule` will be generated in NestJS. It will contain an `AppointmentsController` mapped to `/appointments` and an `AppointmentsService` that interacts with `PrismaService`.
- **Database Schema:** We will implement an `Appointment` Prisma model linking `doctorId`, `serviceTypeId`, `timeSlot`, `date`, `patientName`, `patientPhone`, `reason`, and optionally a `userId` if the booking is tied to an authenticated patient profile.

## Risks / Trade-offs

- **Risk:** Time slot collisions (two users booking the same doctor and slot simultaneously).
  - **Mitigation:** The MVP accepts the possibility of collisions. Subsequent scaling will require database-level constraints or transactional locks to handle availability checking in real-time.
- **Risk:** Unauthenticated spam bookings.
  - **Mitigation:** Later validation can require a valid JWT token. Currently, the form captures phone and name as verification fallbacks.
