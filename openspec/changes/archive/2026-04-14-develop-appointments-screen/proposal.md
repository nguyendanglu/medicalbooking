## Why

Patients currently lack a centralized way to view and manage their medical appointments within the portal. This leads to administrative overhead and a suboptimal user experience where patients cannot easily check their upcoming visit details or history.

## What Changes

- **Screen Layout**: refer to the "Lịch hẹn của tôi" screen from Stitch
- **My Appointments Screen**: A new dedicated dashboard for patients to manage their bookings.
- **Appointment Tab System**: Seamless switching between "Upcoming" (pending/confirmed/checked-in/in-progress) and "History" (completed/canceled/rescheduled) appointments.
- **Detailed Appointment Cards**: Rich UI cards displaying doctor information, specialty, date/time, location, and real-time status (Confirmed, Pending, In-Progress, Completed, Canceled).
- **New Appointment CTA**: Prominent floating or header action to quickly navigate to the booking flow.

## Capabilities

### New Capabilities
- `patient-appointment-history`: Interface and logic for retrieving and displaying a patient's historical and upcoming appointment data.

### Modified Capabilities
- (None)

## Impact

- **Portal Frontend**: New screen `apps/portal/src/app/appointments/page.tsx` and related components.
- **Backend API**: Integration with existing appointment services (`server/src/appointments`).
- **User Flow**: Enhanced navigation from the dashboard/home to appointments management.
