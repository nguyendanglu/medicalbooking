## 1. Preparation and Data Layer

- [x] 1.1 Match backend appointment status enums and define frontend TypeScript interfaces.
- [x] 1.2 Implement the `useAppointments` hook using TanStack Query to fetch patient bookings.
- [x] 1.3 Create a utility function to map appointment statuses to Tailwind CSS color themes.

## 2. Shared UI Components

- [x] 2.1 Develop the `StatusBadge` component for colored status labels.
- [x] 2.2 Develop the `AppointmentCard` component with doctor info, specialty, and schedule details.
- [x] 2.3 Create a "No Appointments" empty state component for both tabs.

## 3. Screen Development

- [x] 3.1 Create the My Appointments page at `apps/portal/src/app/appointments/page.tsx`.
- [x] 3.2 Implement the Tab system (Upcoming vs. History) using state-based filtering.
- [x] 3.3 Add the "Schedule New Appointment" prominent CTA button in the header or floating action.
- [x] 3.4 Integrate individual appointment cards into the tabbed lists with proper sorting.

## 4. Testing and Refinement

- [x] 4.1 Verify that the "Upcoming" tab correctly filters for active bookings (pending, confirmed, checked-in, in-progress).
- [x] 4.2 Verify that the "History" tab correctly shows completed/canceled/rescheduled bookings.
- [x] 4.3 Ensure the responsive layout works on mobile and tablet views.
- [x] 4.4 Final UI polish: Add micro-animations or hover effects to cards for a premium feel.
