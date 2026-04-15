# Design: Admin Appointment Management

## User Interface
- **Page**: `/appointments` in the `admin` application.
- **Layout**: Utilizes the Premium Aura Admin theme with a sidebar, top bar, and a main data table.
- **Components**:
  - `RegistryTable`: Displays patient names, assigned doctors, schedules, and statuses.
  - `FilterBar`: Provides real-time filtering by Date, Department, Doctor, and Status.
  - `StatsCard`: Summarizes today's load (total bookings).

## API & Data Flow
1. **Frontend Request**: The Appointments page (Client Component) fetches data from `GET /api/appointments`.
2. **Next.js API Route**: A proxy route at `apps/admin/src/app/api/appointments/route.ts` forwards the request to the NestJS backend.
   - Attaches the `admin_session` (JWT) to the Authorization header.
3. **NestJS Backend**:
   - `AppointmentsController`: Implements `GET /appointments/admin` (or similar) protected by a Role Guard.
   - `AppointmentsService`: Queries Prisma `Appointment` model with includes for `Doctor` and `ServiceType`.

## Database Schema (Prisma)
The implementation will query the existing `Appointment` model:
- `id`, `patientName`, `date`, `timeSlot`, `status`.
- Relations: `Doctor`, `ServiceType`.

## Security
- Next.js Middleware already protects the `/appointments` route.
- The backend will perform secondary role validation to ensure the requester has administrative privileges.
