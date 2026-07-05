"use client";

import { Mail, GraduationCap, TerminalSquare } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";
import { profile } from "@/data/profile";
import { navLinks } from "@/lib/utils";
import { useTerminal } from "./terminal";

export function Footer() {
  const { setOpen } = useTerminal();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-surface/60">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-mono text-sm font-semibold">
              <span className="text-accent">~/</span>
              {profile.monogram.toLowerCase()}
              <span className="caret-blink text-accent">_</span>
            </p>
            <p className="mt-2 max-w-xs text-xs leading-relaxed text-muted">
              Built with Next.js, TypeScript, Tailwind CSS, and Three.js. Deployed on Vercel.
            </p>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="mt-4 inline-flex items-center gap-2 rounded-md border border-line px-3 py-1.5 font-mono text-xs text-muted transition-colors hover:border-line-bright hover:text-accent"
            >
              <TerminalSquare size={13} aria-hidden />
              open terminal
            </button>
          </div>

          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-10 gap-y-2">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-4 text-muted">
            <a
              href={profile.social.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="transition-colors hover:text-accent"
            >
              <GithubIcon size={18} />
            </a>
            <a
              href={profile.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="transition-colors hover:text-accent"
            >
              <LinkedinIcon size={18} />
            </a>
            <a
              href={profile.social.scholar}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Google Scholar"
              className="transition-colors hover:text-accent"
            >
              <GraduationCap size={19} />
            </a>
            <a
              href={`mailto:${profile.email}`}
              aria-label="Email"
              className="transition-colors hover:text-accent"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

        <p className="mt-10 font-mono text-xs text-muted">
          <span className="text-accent">$</span> echo &quot;© {year} {profile.name}. All systems
          operational.&quot;
        </p>
      </div>
    </footer>
  );
}
