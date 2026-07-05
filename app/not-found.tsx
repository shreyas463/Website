import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center bg-grid px-5 text-center">
      <p className="font-mono text-sm text-accent">HTTP 404</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">Route not found</h1>
      <pre className="mt-6 rounded-xl border border-line bg-surface p-5 text-left font-mono text-sm text-muted">
        {`$ curl -I this-page
HTTP/2 404
error: segment does not exist
hint:  the homepage has everything you need`}
      </pre>
      <Link
        href="/"
        className="mt-8 inline-flex h-11 items-center rounded-md bg-accent px-5 text-sm font-medium text-background transition-opacity hover:opacity-90"
      >
        cd ~/home
      </Link>
    </main>
  );
}
