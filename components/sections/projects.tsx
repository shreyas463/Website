"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Search } from "lucide-react";
import { GithubIcon } from "@/components/ui/brand-icons";
import { projects, projectCategories, type Project, type ProjectCategory } from "@/data/projects";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.25 }}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface transition-colors hover:border-line-bright"
    >
      <div className="relative aspect-[1.7/1] overflow-hidden">
        <Image
          src={project.image}
          alt={`${project.title} screenshot`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          unoptimized={project.image.endsWith(".gif")}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" aria-hidden />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold">{project.title}</h3>
          <div className="flex shrink-0 items-center gap-2.5 text-muted">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} source code on GitHub`}
              className="transition-colors hover:text-accent"
            >
              <GithubIcon size={17} />
            </a>
            {project.demo ? (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} live demo`}
                className="transition-colors hover:text-accent-2"
              >
                <ExternalLink size={17} />
              </a>
            ) : null}
          </div>
        </div>

        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
          <span className="text-foreground/80">{project.problem}</span> {project.solution}
        </p>

        <ul className="mt-4 space-y-1.5">
          {project.features.slice(0, 2).map((f) => (
            <li key={f} className="flex gap-2 text-xs leading-relaxed text-muted">
              <span className="text-accent" aria-hidden>
                ▹
              </span>
              <span className="line-clamp-1">{f}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
          {project.stack.slice(0, 4).map((t) => (
            <span
              key={t}
              className="rounded-md border border-line bg-raised px-2 py-1 font-mono text-[11px] text-muted"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<ProjectCategory | "All">("All");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      const inCategory = filter === "All" || p.categories.includes(filter);
      const matches =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.stack.some((s) => s.toLowerCase().includes(q)) ||
        p.solution.toLowerCase().includes(q);
      return inCategory && matches;
    });
  }, [filter, query]);

  return (
    <section id="projects" className="scroll-mt-20 bg-surface/40 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          index="03"
          title="Featured Projects"
          subtitle="Selected work — each one a real problem, a shipped solution, and the stack behind it."
        />

        <Reveal>
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter projects by category">
              {(["All", ...projectCategories] as const).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setFilter(c)}
                  aria-pressed={filter === c}
                  className={cn(
                    "rounded-md border px-3 py-1.5 font-mono text-xs transition-colors",
                    filter === c
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-line text-muted hover:border-line-bright hover:text-foreground",
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
            <label className="relative ml-auto min-w-44 flex-1 sm:max-w-56">
              <span className="sr-only">Search projects</span>
              <Search
                size={14}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                aria-hidden
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects…"
                className="h-9 w-full rounded-md border border-line bg-surface pl-9 pr-3 text-sm placeholder:text-muted focus:border-accent focus:outline-none"
              />
            </label>
          </div>
        </Reveal>

        <motion.div layout className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </AnimatePresence>
        </motion.div>

        {visible.length === 0 ? (
          <p className="py-12 text-center font-mono text-sm text-muted">
            <span className="text-accent">$</span> grep: no projects match — try a different query
          </p>
        ) : null}
      </div>
    </section>
  );
}
