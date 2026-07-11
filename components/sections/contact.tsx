"use client";

import { useState, type FormEvent } from "react";
import { Mail, FileDown, Copy, Loader2, Send } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";
import { profile } from "@/data/profile";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { useToast } from "@/components/ui/toast";

const FORM_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;

type FormStatus = "idle" | "sending" | "sent";

export function Contact() {
  const toast = useToast();
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function copyEmail() {
    navigator.clipboard
      .writeText(profile.email)
      .then(() => toast("Email copied to clipboard", "success"))
      .catch(() => toast(`Couldn't copy — email is ${profile.email}`, "error"));
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot: bots fill hidden fields, humans don't
    if (data.get("company")) return;

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const nextErrors: Record<string, string> = {};
    if (!name) nextErrors.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = "Please enter a valid email.";
    if (message.length < 10) nextErrors.message = "Message should be at least 10 characters.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    if (!FORM_ENDPOINT) {
      // No form backend configured — fall back to a prefilled email draft
      const subject = encodeURIComponent(`Portfolio contact from ${name}`);
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      toast("Opening your email client…", "info");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (!res.ok) throw new Error(`Form endpoint returned ${res.status}`);
      setStatus("sent");
      form.reset();
      toast("Message sent — I'll get back to you soon!", "success");
    } catch {
      setStatus("idle");
      toast("Something went wrong. Email me directly instead?", "error");
    }
  }

  return (
    <section id="contact" className="scroll-mt-20 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          index="08"
          title="Get In Touch"
          subtitle="I'm open to software engineering roles — backend, full-stack, or forward-deployed. If you're building something interesting, let's talk."
        />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <Reveal>
            <div className="space-y-6">
              <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs text-muted">
                <span className="pulse-dot h-2 w-2 rounded-full bg-emerald-400" aria-hidden />
                {profile.availability}
              </p>

              <ul className="space-y-3">
                <li>
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="group flex w-full items-center gap-3 rounded-xl border border-line bg-surface p-4 text-left transition-colors hover:border-line-bright"
                  >
                    <Mail size={17} className="text-accent" aria-hidden />
                    <span className="text-sm">{profile.email}</span>
                    <Copy
                      size={14}
                      className="ml-auto text-muted opacity-0 transition-opacity group-hover:opacity-100"
                      aria-hidden
                    />
                  </button>
                </li>
                <li>
                  <a
                    href={profile.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-xl border border-line bg-surface p-4 transition-colors hover:border-line-bright"
                  >
                    <LinkedinIcon size={17} className="text-accent" aria-hidden />
                    <span className="text-sm">linkedin.com/in/shreyaschaudharysc</span>
                  </a>
                </li>
                <li>
                  <a
                    href={profile.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-xl border border-line bg-surface p-4 transition-colors hover:border-line-bright"
                  >
                    <GithubIcon size={17} className="text-accent" aria-hidden />
                    <span className="text-sm">github.com/{profile.githubUsername}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={profile.resumeUrl}
                    download
                    className="flex items-center gap-3 rounded-xl border border-line bg-surface p-4 transition-colors hover:border-line-bright"
                  >
                    <FileDown size={17} className="text-accent" aria-hidden />
                    <span className="text-sm">Download resume (PDF)</span>
                  </a>
                </li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <form onSubmit={onSubmit} noValidate className="rounded-xl border border-line bg-surface p-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="mb-1.5 block text-xs font-medium text-muted">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "contact-name-error" : undefined}
                    className="h-10 w-full rounded-md border border-line bg-raised px-3 text-sm focus:border-accent focus:outline-none"
                  />
                  {errors.name ? (
                    <p id="contact-name-error" className="mt-1 text-xs text-rose-400">
                      {errors.name}
                    </p>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="contact-email" className="mb-1.5 block text-xs font-medium text-muted">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "contact-email-error" : undefined}
                    className="h-10 w-full rounded-md border border-line bg-raised px-3 text-sm focus:border-accent focus:outline-none"
                  />
                  {errors.email ? (
                    <p id="contact-email-error" className="mt-1 text-xs text-rose-400">
                      {errors.email}
                    </p>
                  ) : null}
                </div>
              </div>

              {/* Honeypot field — hidden from real users */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="contact-company">Company</label>
                <input id="contact-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
              </div>

              <div className="mt-4">
                <label htmlFor="contact-message" className="mb-1.5 block text-xs font-medium text-muted">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  required
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "contact-message-error" : undefined}
                  className="w-full rounded-md border border-line bg-raised px-3 py-2 text-sm focus:border-accent focus:outline-none"
                />
                {errors.message ? (
                  <p id="contact-message-error" className="mt-1 text-xs text-rose-400">
                    {errors.message}
                  </p>
                ) : null}
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-accent text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 size={15} className="animate-spin" aria-hidden />
                    Sending…
                  </>
                ) : status === "sent" ? (
                  "Sent — thank you!"
                ) : FORM_ENDPOINT ? (
                  <>
                    <Send size={15} aria-hidden />
                    Send Message
                  </>
                ) : (
                  <>
                    <Mail size={15} aria-hidden />
                    Send via Email App
                  </>
                )}
              </button>
              {!FORM_ENDPOINT ? (
                <p className="mt-2.5 text-center text-xs text-muted">
                  Opens your email app with the message pre-filled — or copy my
                  address from the left.
                </p>
              ) : null}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
