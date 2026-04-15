# Patient CRM — Tasks

## Task 1: Fix Prisma Schema & Run Migration
- [x] **1.1** In `server/prisma/schema.prisma`, change `patientId Int @default(0)` on the `Appointment` model to `patientId Int?` (optional) to avoid breaking existing appointment records that have no linked patient profile.
- [x] **1.2** Run `npx prisma migrate dev --name add-patient-profile` inside `server/` to apply the `patient_profiles` and `medical_documents` tables.
- [x] **1.3** Regenerate the Prisma client: `npx prisma generate`.

## Task 2: Backend — Patients Module
- [x] **2.1** Create `server/src/patients/patients.module.ts` — NestJS module importing `PrismaModule`, declaring `PatientsController` and `PatientsService`.
- [x] **2.2** Create `server/src/patients/patients.service.ts` with two methods:
  - `findAll(search?, condition?, status?)` — Returns paginated list of patient profiles with joined user data, filtering by search term (name/email/phone) and optional condition/status enums.
  - `findOne(id: number)` — Returns single patient profile with full includes: `user`, last 10 `appointments` (with `doctor` and `serviceType`), and `documents`.
- [x] **2.3** Create `server/src/patients/patients.controller.ts` with:
  - `GET /patients/admin` — Uses `JwtAuthGuard` + `RolesGuard` with `@Roles('ADMIN', 'STAFF', 'DOCTOR')`. Accepts `?search=`, `?condition=`, `?status=` query params.
  - `GET /patients/admin/:id` — Same guards. Returns full patient detail.
- [x] **2.4** Register `PatientsModule` in `server/src/app.module.ts`.

## Task 3: Frontend — Next.js API Proxy
- [x] **3.1** Create `apps/admin/src/app/api/patients/route.ts` — GET proxy to `http://127.0.0.1:3000/patients/admin`. Awaits `cookies()`, extracts `admin_session` JWT, forwards `Authorization` header. Passes through query params (`search`, `condition`, `status`).
- [x] **3.2** Create `apps/admin/src/app/api/patients/[id]/route.ts` — GET proxy to `http://127.0.0.1:3000/patients/admin/:id`.

## Task 4: Frontend — Patient CRM Page
- [x] **4.1** Create `apps/admin/src/app/patients/page.tsx` with the full CRM layout:
  - Refer to "patient_crm.html" file in openspec/changes/patient-crm/ folder to get the layout and design tokens.
- [x] **4.2** Implement interfaces: `PatientProfile`, `PatientAppointment`, `MedicalDocument`.
- [x] **4.3** Implement `fetchPatients()` with debounced search, calling `/api/patients?search=&condition=&status=`.
- [x] **4.4** Implement `fetchPatientDetail(id)` calling `/api/patients/:id` when a row is clicked.
- [x] **4.5** Apply color-coded status and condition badges per the design tokens.
- [x] **4.6** Implement a slide-in drawer animation (CSS transform / transition) for the detail panel.

## Task 5: Sidebar Navigation Update
- [x] **5.1** In `apps/admin/src/app/appointments/page.tsx`, change the "Patient CRM" `Link` `href` from `"#"` to `"/patients"`.
- [x] **5.2** In `apps/admin/src/app/dashboard/page.tsx`, make the same sidebar link update so navigation is consistent.

## Task 6: Seed Test Data (Optional)
- [ ] **6.1** Create or update a seed script in `server/` to insert 3–5 sample `PatientProfile` records linked to existing `User` accounts (with role `PATIENT`) so the CRM page is demonstrable.
