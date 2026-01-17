import Link from "next/link";

/**
 * Custom 404 page with navigation back to documentation.
 */
export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <main className="flex flex-col items-center gap-6 p-8 text-center">
        <h1 className="text-6xl font-bold text-black">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800">Page Not Found</h2>
        <p className="max-w-md text-gray-600">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/problem-solution"
          className="mt-4 inline-flex items-center gap-2 rounded-md bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800"
        >
          ← Back to Documentation
        </Link>
      </main>
    </div>
  );
}
