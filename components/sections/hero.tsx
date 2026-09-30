"use client";

import Image from "next/image";
import { ArrowDownRight, ArrowUpRight, FileDown, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";
import { profile } from "@/data/profile";
import { useToast } from "@/components/ui/toast";

export function Hero() {
  const toast = useToast();
  function copyEmail() {
    navigator.clipboard.writeText(profile.email)
      .then(() => toast("Email copied to clipboard", "success"))
      .catch(() => toast(`Email: ${profile.email}`, "error"));
  }

  return (
    <section className="hero-paper relative min-h-svh overflow-hidden border-b border-line px-5 pb-14 pt-28 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-8 flex items-center justify-between border-b border-line pb-3 font-mono text-[10px] uppercase tracking-[0.24em] text-muted sm:text-xs">
          <span>Portfolio / 2026</span>
          <span className="hidden sm:inline">{profile.location}</span>
          <span className="inline-flex items-center gap-2"><i className="h-2 w-2 rounded-full bg-[#d9623f]" /> {profile.availability}</span>
        </div>

        <div className="grid items-end gap-10 lg:grid-cols-[1.15fr_.85fr]">
          <div className="relative z-10">
            <p className="mb-5 font-mono text-sm uppercase tracking-[0.28em] text-accent">Hello, I&apos;m Shreyas <span aria-hidden>✦</span></p>
            <h1 className="display-type max-w-5xl text-[clamp(4.1rem,10.5vw,10.5rem)] leading-[.78] tracking-[-.075em]">
              Software<br /><span className="relative ml-[.1em] italic text-accent-2">engineer.</span>
            </h1>
            <p className="mt-10 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
              {profile.tagline} Currently shipping pharmacy-scale systems at
              <span className="font-medium text-foreground"> GlobalLogic × Walgreens</span>.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#projects" className="ink-button group">Explore selected work <ArrowDownRight size={17} className="transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" /></a>
              <a href={profile.resumeUrl} download className="paper-button"><FileDown size={16} /> Resume</a>
              <button type="button" onClick={copyEmail} className="paper-button"><Mail size={16} /> Copy email</button>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[560px] lg:mx-0 lg:justify-self-end">
            <div className="absolute -left-8 top-12 z-20 -rotate-6 border border-line bg-[#e8b44c] px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest text-[#231f1a] shadow-[4px_5px_0_var(--foreground)]">Systems thinker</div>
            <div className="portrait-frame relative ml-auto aspect-[4/5] w-[85%] overflow-hidden border-2 border-foreground bg-surface shadow-[14px_16px_0_var(--accent)] sm:w-[78%]">
              <Image src={profile.photo} alt={`Portrait of ${profile.name}`} fill priority sizes="(max-width: 1024px) 78vw, 470px" className="object-cover grayscale-[18%] contrast-[1.03]" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/70 to-transparent p-5 pt-20 text-white">
                <div><p className="font-mono text-[10px] uppercase tracking-[.24em] text-white/70">Currently</p><p className="mt-1 text-sm font-medium">{profile.currentRole}</p></div><ArrowUpRight size={20} />
              </div>
            </div>
            <div className="absolute -bottom-6 left-0 z-20 w-52 rotate-3 border border-line bg-surface p-4 shadow-[6px_7px_0_var(--foreground)]">
              <p className="font-mono text-[10px] uppercase tracking-[.2em] text-accent">Current signal</p>
              <p className="mt-2 text-sm leading-snug">8,000 stores. 9M+ daily customers. Quality owned end to end.</p>
            </div>
          </div>
        </div>

        <div className="mt-24 grid gap-4 border-t border-line pt-5 text-sm sm:grid-cols-[1fr_auto] sm:items-center">
          <p className="max-w-3xl font-mono text-xs uppercase tracking-[.17em] text-muted">Full-stack engineering · backend systems · AI products · cloud applications · test automation</p>
          <div className="flex items-center gap-5 text-muted">
            <a href={profile.social.github} target="_blank" rel="noreferrer" className="hover:text-accent" aria-label="GitHub"><GithubIcon size={18} /></a>
            <a href={profile.social.linkedin} target="_blank" rel="noreferrer" className="hover:text-accent" aria-label="LinkedIn"><LinkedinIcon size={18} /></a>
            <a href="#about" className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-widest hover:text-accent">Scroll to discover <ArrowDownRight size={15} /></a>
          </div>
        </div>
      </div>
    </section>
  );
}
