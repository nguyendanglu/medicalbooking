import Link from 'next/link';

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface text-on-surface">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-error mb-4">403</h1>
        <h2 className="text-2xl font-semibold mb-2">Access Forbidden</h2>
        <p className="text-on-surface-variant mb-6">
          You do not have the required administrative privileges to access this portal.
        </p>
        <Link href="/" className="text-primary hover:underline">
          Return to Patient Portal
        </Link>
      </div>
    </div>
  );
}
