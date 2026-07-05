"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight, FileDown, Mail, GraduationCap } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";
import { profile } from "@/data/profile";
import { useToast } from "@/components/ui/toast";

const HeroScene = dynamic(() => import("@/components/three/hero-scene"), {
  ssr: false,
  loading: () => null,
});

function RotatingRole() {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % profile.roles.length), 2600);
    return () => clearInterval(id);
  }, [reduceMotion]);

  return (
    <span className="relative inline-flex h-[1.6em] overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={profile.roles[index]}
          initial={reduceMotion ? false : { y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduceMotion ? undefined : { y: "-100%", opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="whitespace-nowrap text-accent"
        >
          {profile.roles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function Hero() {
  const toast = useToast();

  function copyEmail() {
    navigator.clipboard
      .writeText(profile.email)
      .then(() => toast("Email copied to clipboard", "success"))
      .catch(() => toast("Couldn't copy — email is " + profile.email, "error"));
  }

  return (
    <section className="relative flex min-h-svh items-center overflow-hidden bg-grid">
      {/* 3D scene sits behind the copy; pointer-events pass through */}
      <div className="pointer-events-none absolute inset-0 opacity-80" aria-hidden>
        <HeroScene />
      </div>
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background via-background/70 to-background/20"
        aria-hidden
      />
      {/* Red glow to warm up the cyan scene */}
      <div
        className="pointer-events-none absolute right-0 top-1/4 h-[30rem] w-[30rem] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(244,63,94,0.22) 0%, transparent 68%)" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(244,63,94,0.12) 0%, transparent 70%)" }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-16 pt-28">
        <div className="max-w-3xl">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-3.5 py-1.5 text-xs text-muted backdrop-blur">
            <span className="pulse-dot h-2 w-2 rounded-full bg-emerald-400" aria-hidden />
            {profile.availability}
          </p>

          <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
            {profile.name}
          </h1>

          <p className="mt-4 font-mono text-lg text-muted sm:text-xl">
            <span className="text-accent">const</span> focus = <RotatingRole />
          </p>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {profile.tagline} Currently shipping pharmacy-scale systems at{" "}
            <span className="text-foreground">GlobalLogic × Walgreens</span>.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="group inline-flex h-11 items-center gap-2 rounded-md bg-accent px-5 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              View My Work
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" aria-hidden />
            </a>
            <a
              href={profile.resumeUrl}
              download
              className="inline-flex h-11 items-center gap-2 rounded-md border border-line-bright px-5 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
            >
              <FileDown size={15} aria-hidden />
              Download Resume
            </a>
            <a
              href="#contact"
              className="inline-flex h-11 items-center rounded-md px-4 text-sm text-muted transition-colors hover:text-foreground"
            >
              Contact Me
            </a>
          </div>

          <div className="mt-10 flex items-center gap-4 text-muted">
            <a
              href={profile.social.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="transition-colors hover:text-accent"
            >
              <GithubIcon size={19} />
            </a>
            <a
              href={profile.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="transition-colors hover:text-accent"
            >
              <LinkedinIcon size={19} />
            </a>
            <a
              href={profile.social.scholar}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Google Scholar"
              className="transition-colors hover:text-accent"
            >
              <GraduationCap size={20} />
            </a>
            <button
              type="button"
              onClick={copyEmail}
              aria-label="Copy email address"
              className="transition-colors hover:text-accent"
            >
              <Mail size={19} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
