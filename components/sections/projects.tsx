"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/ui/brand-icons";
import { projects } from "@/data/projects";
import { SectionHeading } from "@/components/ui/section-heading";

// Preserve the complete project catalog from the original portfolio. The new
// carousel changes only presentation; it does not hide or discard any entries.
const projectCatalog = projects;

function ProjectMedia({ project, reduceMotion }: {
  project: (typeof projectCatalog)[number];
  reduceMotion: boolean | null;
}) {
  const isGif = project.image.toLowerCase().endsWith(".gif");

  if (project.video) {
    return (
      <div className="absolute inset-0 flex items-center justify-center p-3 sm:p-5">
        <video
          key={project.video}
          src={project.video}
          poster={project.image}
          autoPlay={!reduceMotion}
          muted
          loop
          playsInline
          controls={Boolean(reduceMotion)}
          preload="metadata"
          aria-label={`${project.title} live project demo`}
          className="h-full w-full rounded-sm object-contain"
        />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center p-3 sm:p-5">
      <Image
        src={project.image}
        alt={`${project.title} ${isGif ? "animated demo" : "project preview"}`}
        fill
        sizes="(max-width: 1024px) 100vw, 55vw"
        className="!relative h-full w-full rounded-sm object-contain"
        unoptimized={isGif}
      />
    </div>
  );
}

export function Projects() {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const project = projectCatalog[active];
  const move = (direction: -1 | 1) => setActive((current) => (current + direction + projectCatalog.length) % projectCatalog.length);

  return (
    <section id="projects" className="scroll-mt-20 overflow-hidden border-y border-line bg-raised py-24 sm:py-32">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <SectionHeading index="03" eyebrow="The workshop" title="Selected projects" subtitle="A rotating shelf of products, experiments, and systems built to answer real questions—not just fill a grid." />
        <div className="relative mt-12 grid overflow-hidden border-2 border-foreground bg-surface shadow-[10px_12px_0_var(--accent)] lg:grid-cols-[1.08fr_.92fr]">
          <div className="relative min-h-[300px] overflow-hidden border-b-2 border-foreground bg-[#e9e3d6] sm:min-h-[390px] lg:min-h-[500px] lg:border-b-0 lg:border-r-2">
            <AnimatePresence mode="wait">
              <motion.div key={project.id} initial={reduceMotion ? false : { opacity: 0, scale: 1.03 }} animate={{ opacity: 1, scale: 1 }} exit={reduceMotion ? undefined : { opacity: 0 }} transition={{ duration: .4 }} className="absolute inset-0">
                <ProjectMedia project={project} reduceMotion={reduceMotion} />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-24 bg-gradient-to-t from-black/55 to-transparent" />
              </motion.div>
            </AnimatePresence>
            <div className="absolute left-5 top-5 z-30 border border-white/30 bg-black/45 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[.2em] text-white backdrop-blur">{project.video || project.image.endsWith(".gif") ? "Live preview" : "Field note"} {String(active + 1).padStart(2, "0")}</div>
            <div className="absolute bottom-5 left-5 right-5 z-30 flex items-center justify-between text-white"><span className="font-mono text-xs uppercase tracking-[.22em]">{project.categories.join(" · ")}</span><span className="font-mono text-xs">{String(active + 1).padStart(2, "0")} / {String(projectCatalog.length).padStart(2, "0")}</span></div>
          </div>
          <div className="flex min-h-[520px] flex-col p-6 sm:p-10 lg:p-12">
            <AnimatePresence mode="wait">
              <motion.div key={project.id} initial={reduceMotion ? false : { y: 18, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={reduceMotion ? undefined : { y: -12, opacity: 0 }} transition={{ duration: .3 }}>
                <p className="font-mono text-xs uppercase tracking-[.22em] text-accent">{project.stack.slice(0, 3).join(" / ")}</p>
                <h3 className="display-type mt-5 text-5xl leading-none tracking-[-.045em] sm:text-7xl">{project.title}</h3>
                <p className="mt-7 text-base font-medium leading-relaxed text-foreground">{project.problem}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">{project.solution}</p>
              </motion.div>
            </AnimatePresence>
            <div className="mt-auto flex flex-wrap items-center gap-3 pt-10">
              <a href={project.github} target="_blank" rel="noreferrer" className="ink-button"><GithubIcon size={16} /> Source <ArrowUpRight size={16} /></a>
              {project.demo ? <a href={project.demo} target="_blank" rel="noreferrer" className="paper-button"><ExternalLink size={16} /> Live demo</a> : null}
              <div className="ml-auto flex gap-2"><button type="button" onClick={() => move(-1)} className="project-arrow" aria-label="Previous project"><ArrowLeft size={19} /></button><button type="button" onClick={() => move(1)} className="project-arrow" aria-label="Next project"><ArrowRight size={19} /></button></div>
            </div>
          </div>
        </div>
        <div className="mt-10 flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Choose a project">
          {projectCatalog.map((item, index) => <button key={item.id} type="button" role="tab" aria-selected={active === index} onClick={() => setActive(index)} className={`shrink-0 border-b-2 px-3 py-3 text-left transition-colors ${active === index ? "border-accent text-foreground" : "border-line text-muted hover:border-muted hover:text-foreground"}`}><span className="mr-2 font-mono text-[10px] text-accent">{String(index + 1).padStart(2, "0")}</span><span className="text-sm font-medium">{item.title}</span></button>)}
          <a href="https://github.com/shreyas463" target="_blank" rel="noreferrer" className="ml-auto shrink-0 px-3 py-3 font-mono text-xs uppercase tracking-widest text-accent hover:text-foreground">More on GitHub ↗</a>
        </div>
      </div>
    </section>
  );
}
