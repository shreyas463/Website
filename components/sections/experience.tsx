"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MapPin } from "lucide-react";
import { experience, education } from "@/data/experience";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

function ExperienceCard({
  item,
  index,
}: {
  item: (typeof experience)[number];
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const hasDetails = Boolean(item.details?.length);

  return (
    <Reveal delay={Math.min(index * 0.05, 0.2)}>
      <article className="relative pl-8 sm:pl-10">
        {/* Timeline marker */}
        <span
          className={cn(
            "absolute left-0 top-2 h-3 w-3 rounded-full border-2",
            item.current
              ? "border-accent bg-accent/30 pulse-dot"
              : "border-line-bright bg-surface",
          )}
          aria-hidden
        />
        <div className="rounded-xl border border-line bg-surface p-6 transition-colors hover:border-line-bright">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="text-lg font-semibold">
              {item.role}
              <span className="text-muted"> · </span>
              <span className="text-accent">{item.company}</span>
              {item.client ? (
                <span className="text-sm font-normal text-muted"> ({item.client})</span>
              ) : null}
            </h3>
            <p className="font-mono text-xs text-muted">
              {item.start} — {item.end}
            </p>
          </div>
          <p className="mt-1 flex items-center gap-1.5 text-xs text-muted">
            <MapPin size={11} aria-hidden />
            {item.location}
          </p>

          <p className="mt-4 text-sm leading-relaxed text-muted">{item.summary}</p>

          <ul className="mt-4 space-y-2.5">
            {item.bullets.map((b) => (
              <li key={b} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                <span className="mt-0.5 shrink-0 text-accent" aria-hidden>
                  ▹
                </span>
                <span>{b}</span>
              </li>
            ))}
          </ul>

          {hasDetails ? (
            <>
              <button
                type="button"
                onClick={() => setExpanded((e) => !e)}
                aria-expanded={expanded}
                className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs text-accent transition-colors hover:text-foreground"
              >
                <ChevronDown
                  size={13}
                  className={cn("transition-transform", expanded && "rotate-180")}
                  aria-hidden
                />
                {expanded ? "hide details" : "more details"}
              </button>
              <AnimatePresence initial={false}>
                {expanded ? (
                  <motion.ul
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="mt-3 space-y-2 overflow-hidden border-l-2 border-line pl-4"
                  >
                    {item.details!.map((d) => (
                      <li key={d} className="text-sm leading-relaxed text-muted">
                        {d}
                      </li>
                    ))}
                  </motion.ul>
                ) : null}
              </AnimatePresence>
            </>
          ) : null}

          <div className="mt-5 flex flex-wrap gap-1.5">
            {item.technologies.map((t) => (
              <span
                key={t}
                className="rounded-md border border-line bg-raised px-2 py-1 font-mono text-[11px] text-muted"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-20 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          index="02"
          title="Experience"
          subtitle="Engineering impact across enterprise systems, startups-inside-consultancies, and research labs."
        />

        <div className="relative space-y-6 before:absolute before:bottom-4 before:left-[5px] before:top-4 before:w-px before:bg-line sm:before:left-[5px]">
          {experience.map((item, i) => (
            <ExperienceCard key={item.id} item={item} index={i} />
          ))}
        </div>

        <Reveal>
          <h3 className="mb-6 mt-16 text-sm font-semibold uppercase tracking-widest text-muted">
            Education
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {education.map((e) => (
              <div key={e.school} className="rounded-xl border border-line bg-surface p-6">
                <div className="flex items-baseline justify-between gap-3">
                  <h4 className="font-semibold">{e.degree}</h4>
                  <span className="shrink-0 font-mono text-xs text-accent">GPA {e.gpa}</span>
                </div>
                <p className="mt-1 text-sm text-muted">{e.school}</p>
                <p className="mt-1 font-mono text-xs text-muted">
                  {e.start} — {e.end}
                </p>
                {e.notes ? (
                  <p className="mt-3 text-xs leading-relaxed text-muted">{e.notes}</p>
                ) : null}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
