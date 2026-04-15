# Tasks: Admin Appointment Management

## Phase 1: Backend Implementation
- [x] Create `GET /appointments/admin` endpoint in NestJS `AppointmentsController`.
  - [x] Implement query filters (date, doctorId, status).
  - [x] Ensure the service includes `Doctor` and `ServiceType` relations.
  - [x] Protect with `@UseGuards(JwtAuthGuard, RolesGuard)` allowing only `ADMIN`, `DOCTOR`, `STAFF`.
- [x] Create `PATCH /appointments/:id/status` endpoint for quick actions (Confirm, Cancel, Rescheduled, Completed).
- [x] Verify backend endpoints using a test script.

## Phase 2: Frontend Integration
- [x] Create `/api/appointments` route in the `admin` app as a secure proxy to the backend.
  - [x] Handle headers and error forwarding.
- [x] Implement the `AppointmentsPage` component (`apps/admin/src/app/appointments/page.tsx`).
  - [x] Port the provided HTML structure of `admin_appointment.html` into a Next.js Client Component.
  - [x] Use `useEffect` for data fetching.
  - [x] Implement local state for filtering and pagination.
- [x] Create sub-components for the table rows and filter bars to improve maintainability.
- [x] Add loading skeletons and error states.

## Phase 3: Polish & Verification
- [x] Test filtering logic with various criteria.
- [x] Verify that "Export PDF" and "New Appointment" buttons (placeholders for now) feel responsive.
- [x] Ensure the UI matches the premium Aura design exactly as provided in the HTML.
- [x] Final end-to-end verification of the appointment management flow.
