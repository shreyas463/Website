import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { profile } from "@/data/profile";
import { Providers } from "@/components/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: {
    default: `${profile.name} — Software Engineer`,
    template: `%s — ${profile.name}`,
  },
  description: profile.tagline,
  keywords: [
    "Software Engineer",
    "Full-Stack Developer",
    "Backend Engineer",
    "AI Engineer",
    "Test Automation",
    profile.name,
  ],
  authors: [{ name: profile.name, url: profile.siteUrl }],
  openGraph: {
    title: `${profile.name} — Software Engineer`,
    description: profile.tagline,
    url: profile.siteUrl,
    siteName: profile.name,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — Software Engineer`,
    description: profile.tagline,
  },
  robots: { index: true, follow: true },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: "Software Engineer",
  email: `mailto:${profile.email}`,
  url: profile.siteUrl,
  sameAs: [profile.social.github, profile.social.linkedin, profile.social.scholar],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Chicago",
    addressRegion: "IL",
    addressCountry: "US",
  },
  alumniOf: "California State Polytechnic University, Pomona",
  knowsAbout: [
    "Full-Stack Development",
    "Backend Systems",
    "AI Engineering",
    "Test Automation",
    "Cloud Computing",
  ],
};

/** Applies the saved theme before first paint to avoid a flash. */
const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t==="light")document.documentElement.classList.add("light");}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-background focus:text-sm focus:font-medium"
        >
          Skip to content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
