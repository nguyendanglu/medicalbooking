## Context

The Medical Booking portal currently lacks a dedicated screen for patients to view their appointment history and upcoming bookings. While the backend has an appointments service, the frontend needs to implement a modern, responsive interface that provides clear status tracking and easy navigation for scheduling new appointments.

## Goals / Non-Goals

**Goals:**
- Implement a professional, "Smart Clinic" themed "My Appointments" screen.
- Support toggling between "Upcoming" and "History" appointments.
- Display rich details: Doctor name, specialty, location, time, and status labels.
- Provide a clear Call-to-Action (CTA) for booking new appointments.
- Ensure optimal data fetching and caching using TanStack Query.

**Non-Goals:**
- Implementing appointment cancellation or rescheduling logic in this phase.
- Real-time backend push notifications (polling or query refetching will be used).
- Detailed electronic health record (EHR) viewing from this screen.

## Decisions

- **UI Layout**: Multi-tab interface using a controlled state for filtering. The "Upcoming" tab will show appointments with statuses: `PENDING`, `CONFIRMED`, `IN_PROGRESS`. The "History" tab will show `COMPLETED`, `CANCELED`.
- **Data Fetching**: Use a custom hook `useAppointments` wrapping a TanStack Query `useQuery` call to fetch patient-specific appointments.
- **Component Strategy**:
    - `AppointmentList`: Container for fetching and rendering segments.
    - `AppointmentCard`: Reusable dumb component for individual booking display.
    - `StatusBadge`: Dynamic styling based on the appointment status enum.
- **Navigation**: Use Next.js `Link` for the "Schedule New" button, pointing to the existing booking flow.

## Risks / Trade-offs

- **[Risk]** Large historical data impact on performance → **[Mitigation]** Implement cursor-based pagination or limit history to the last 12 months by default.
- **[Risk]** Status color inconsistency → **[Mitigation]** Centralize status-to-color mapping in a utility or theme constant.
- **[Risk]** Data staleness → **[Mitigation]** Set a reasonable `staleTime` and implement `refetchOnWindowFocus` for TanStack Query.
