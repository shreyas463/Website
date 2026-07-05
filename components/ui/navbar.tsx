"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, FileDown, Command } from "lucide-react";
import { navLinks } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { profile } from "@/data/profile";
import { ThemeToggle } from "./theme-toggle";
import { useCommandPalette } from "./command-palette";

export function Navbar() {
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { setOpen: openPalette } = useCommandPalette();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    for (const link of navLinks) {
      const el = document.getElementById(link.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || open
          ? "border-b border-line bg-background/85 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5"
      >
        <Link
          href="#"
          className="font-mono text-sm font-semibold tracking-tight"
          aria-label={`${profile.name} — home`}
        >
          <span className="text-accent">~/</span>
          {profile.monogram.toLowerCase()}
          <span className="caret-blink text-accent">_</span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={cn(
                  "rounded-md px-3 py-2 text-sm transition-colors",
                  active === link.id
                    ? "text-accent"
                    : "text-muted hover:text-foreground",
                )}
                aria-current={active === link.id ? "true" : undefined}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => openPalette(true)}
            className="hidden h-9 items-center gap-2 rounded-md border border-line px-3 font-mono text-xs text-muted transition-colors hover:border-line-bright hover:text-foreground sm:flex"
            aria-label="Open command palette"
          >
            <Command size={13} aria-hidden />
            <span>K</span>
          </button>
          <ThemeToggle />
          <a
            href={profile.resumeUrl}
            download
            className="hidden h-9 items-center gap-2 rounded-md bg-accent px-3.5 text-sm font-medium text-background transition-opacity hover:opacity-90 sm:flex"
          >
            <FileDown size={15} aria-hidden />
            Resume
          </a>
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-md border border-line text-muted lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-line bg-background/95 px-5 pb-5 pt-2 backdrop-blur-md lg:hidden">
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block rounded-md px-2 py-3 text-sm",
                    active === link.id ? "text-accent" : "text-muted",
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="mt-2">
              <a
                href={profile.resumeUrl}
                download
                className="flex h-10 w-full items-center justify-center gap-2 rounded-md bg-accent text-sm font-medium text-background"
              >
                <FileDown size={15} aria-hidden />
                Download Resume
              </a>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
