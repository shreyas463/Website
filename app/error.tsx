"use client";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center bg-grid px-5 text-center">
      <p className="font-mono text-sm text-rose-400">runtime exception</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">Something broke</h1>
      <p className="mt-3 max-w-md text-sm text-muted">
        An unexpected error occurred{error.digest ? ` (digest: ${error.digest})` : ""}. Try again —
        if it persists, the fix is probably already deploying.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-8 inline-flex h-11 items-center rounded-md bg-accent px-5 text-sm font-medium text-background transition-opacity hover:opacity-90"
      >
        Retry
      </button>
    </main>
  );
}
