## 1. Backend: Database Schema and Module Setup

- [x] 1.1 Update `schema.prisma` with the `Appointment` model (fields: id, doctorId, serviceTypeId, timeSlot, date, patientName, patientPhone, reason, userId).
- [x] 1.2 Run Prisma migration to apply the new schema.
- [x] 1.3 Create `AppointmentsModule`, `AppointmentsController`, and `AppointmentsService` in the NestJS backend.

## 2. Backend: API Endpoints Implementation

- [x] 2.1 Implement `GET /api/doctors` and `GET /api/services` (or related endpoints on their respective controllers) to fetch catalog data.
- [x] 2.2 Implement `GET /api/time-slots` or similar endpoint to list available mock or DB-backed time slots.
- [x] 2.3 Implement `POST /api/appointments` to accept the new booking payload, validate it, and persist it via `PrismaService`.

## 3. Frontend: Booking Form Setup

- [x] 3.1 Create the main `/booking` page in Next.js with a state-driven multi-step wizard shell.
- [x] 3.2 Initialize `react-hook-form` linked with a Zod schema matching the required booking fields.
- [x] 3.3 Integrate `Service Selection` and `Doctor Selection` components, fetching data from `AppointmentsController`.
- [x] 3.4 Integrate real-time `Time Slot Selection` component.
- [x] 3.5 Build the `Patient Information` step and finalize the submit handler to call `POST /api/appointments`.

## 4. Frontend: Booking Steps Components

- [x] 4.1 Implement Step 1: Service Selection UI (fetching and displaying services).
- [x] 4.2 Implement Step 2: Doctor Selection UI (fetching and displaying doctors).
- [x] 4.3 Implement Step 3: Date and Time Slot Picker UI (fetching available slots for the selected date and doctor).
- [x] 4.4 Implement Step 4: Patient Information Form (name, phone, reason).

## 5. Integration and Polish

- [x] 5.1 Integrate the final "Submit" action at Step 4 to call `POST /api/appointments`.
- [x] 5.2 Build a success confirmation view/modal that displays the generated appointment details.
- [x] 5.3 Perform end-to-end testing of the complete user journey.
