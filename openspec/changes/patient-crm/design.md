# Patient CRM — Design

## Architecture Overview

The Patient CRM follows the same three-layer proxy pattern established by the Appointment Registry:

```
Browser (Next.js Admin App :3002)
    ↓  fetch("/api/patients/...")
Next.js API Route Proxy (apps/admin/src/app/api/patients/)
    ↓  fetch("http://127.0.0.1:3000/patients/...")  + Authorization header
NestJS Backend (:3000) → Prisma → Neon PostgreSQL
```

---

## Backend: NestJS (`server/`)

### 1. Prisma Migration
- Run `npx prisma migrate dev --name add-patient-profile` to create the `patient_profiles` and `medical_documents` tables from the existing schema definition.
- Fix the `Appointment` model: the `patientId Int @default(0)` field creates a non-nullable FK with a default — this is problematic. Change strategy: make the column **optional** (`patientId Int?`) so that existing appointments without a linked profile are still valid.

### 2. Patients Module (`server/src/patients/`)
- **`PatientsModule`**: NestJS module, exports `PatientsService`.
- **`PatientsController`** — endpoints:
  - `GET /patients/admin` — Paginated list of all patient profiles with joined `user` data. Supports query param `?search=` for name/email/phone search and `?condition=` / `?status=` filters. Requires `ADMIN`, `DOCTOR` or `STAFF` role.
  - `GET /patients/admin/:id` — Single patient profile with full details: user info, appointment history (last 10), and linked medical documents. Requires `ADMIN`, `DOCTOR` or `STAFF` role.
- **`PatientsService`**:
  - `findAll(search, condition, status)` — Queries `PatientProfile` with a `where` clause using Prisma `contains` on joined `user.firstName`, `user.lastName`, `user.email`.
  - `findOne(id)` — Queries single profile with `include: { user: true, appointments: { include: { doctor: true, serviceType: true } }, documents: true }`.

### 3. App Module Registration
- Register `PatientsModule` inside `AppModule` imports.

---

## Frontend: Next.js Admin (`apps/admin/`)

### 1. Next.js API Proxy Routes (`apps/admin/src/app/api/patients/`)
- `route.ts` (GET) — Proxies to `GET /patients/admin` on the backend, forwarding the `admin_session` JWT.
- `[id]/route.ts` (GET) — Proxies to `GET /patients/admin/:id` on the backend.

### 2. Patients Page (`apps/admin/src/app/patients/page.tsx`)
Layout mirrors the Appointments page for consistency.

**Left Panel — Patient List**:
- Header with title "Patient CRM" and a live search input.
- Filter chips for `HealthCondition` and `PatientStatus`.
- Table columns: Avatar/Initials | Name & Email | Phone | Condition | Status | Last Appointment | Actions.
- Clicking a row opens the detail panel.

**Right Panel — Patient Detail Drawer** (slides in):
- Patient avatar, full name, contact info, birthday, gender, blood type, address.
- Health condition badge + Status badge (color-coded: STABLE=green, OBSERVATION=yellow, CRITICAL=red).
- Medical History & Allergies text areas (read-only).
- Appointment History tab: list of past appointments with doctor, service, date, and status.
- Documents tab: list of linked medical documents with file name, type, and a link to open `fileUrl`.

### 3. Sidebar Navigation Update
- Update `appointments/page.tsx` and `dashboard/page.tsx` sidebar to make the "Patient CRM" link point to `/patients` instead of `#`.

---

## Data Model Reference (from `schema.prisma`)

```prisma
model PatientProfile {
  id             Int              @id @default(autoincrement())
  userId         String           @unique
  user           User             @relation(...)
  condition      HealthCondition? @default(WELLNESS_CHECK)
  birthday       DateTime?
  gender         String?
  bloodType      String?
  address        String?
  status         PatientStatus    @default(STABLE)
  image          String?
  medicalHistory String?
  allergies      String?
  appointments   Appointment[]
  documents      MedicalDocument[]
}
```

---

## UI Design Tokens (consistent with Admin Portal)

| Element | Style |
|---|---|
| Page background | `bg-slate-50` |
| Sidebar | `bg-white border-r border-slate-200` |
| STABLE badge | `bg-green-100 text-green-700` |
| OBSERVATION badge | `bg-yellow-100 text-yellow-700` |
| CRITICAL badge | `bg-red-100 text-red-700` |
| WELLNESS_CHECK | `bg-blue-100 text-blue-700` |
| HYPERTENSION | `bg-orange-100 text-orange-700` |
| PHYSIOTHERAPY | `bg-purple-100 text-purple-700` |
| POST_OP_RECOV | `bg-teal-100 text-teal-700` |
| Detail drawer | `fixed right-0, w-[480px], shadow-2xl, slide-in animation` |
