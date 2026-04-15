# Patient CRM

## What

Implement a Patient CRM (Customer Relationship Management) module in the Admin Portal that gives clinic staff a comprehensive view for managing all patient records. The feature includes:

- **Patient List View**: A searchable, filterable table of all registered patients showing key info (name, email, phone, health condition, status, last visit).
- **Quick Search**: Real-time search across patient name, email, and phone number.
- **Health Condition Tracking**: Filter and view patients by their `HealthCondition` (`WELLNESS_CHECK`, `HYPERTENSION`, `PHYSIOTHERAPY`, `POST_OP_RECOV`) and `PatientStatus` (`STABLE`, `OBSERVATION`, `CRITICAL`).
- **Detailed Profile Access**: A detailed patient profile sidebar/drawer showing full profile information, appointment history, medical notes, allergies, and linked documents.
- **Sidebar Navigation Integration**: Update the Admin sidebar to link "Patient CRM" to the new `/patients` page.

## Why

- The Admin Portal currently has a working Appointment Registry but has no way to manage the patients who book those appointments.
- Clinic staff need to quickly look up patient health status during triage and appointment confirmation.
- The `PatientProfile` and `MedicalDocument` Prisma models have been defined by the user and require a backend API and frontend UI to expose their data.
- Without a CRM, tracking patient health conditions and history requires direct database access, which is not scalable.

## Non-goals

- This change does **not** implement creating or editing patient profiles from the admin panel (read-only for now).
- This change does **not** implement the Medical Document upload flow (file upload to S3/Cloudinary is out of scope).
- This change does **not** implement real-time telemedicine/chat features.
