import { ExternalLink, Award } from "lucide-react";
import { publications, certifications } from "@/data/publications";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

export function Publications() {
  return (
    <section id="publications" className="scroll-mt-20 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          index="06"
          title="Publications & Research"
          subtitle="Peer-reviewed work across autonomous vehicles, deep learning, and computer vision."
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {publications.map((pub, i) => (
            <Reveal key={pub.id} delay={Math.min(i * 0.05, 0.15)}>
              <article className="flex h-full flex-col rounded-xl border border-line bg-surface p-6 transition-colors hover:border-line-bright">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-semibold leading-snug">{pub.title}</h3>
                  <span className="shrink-0 rounded-md border border-line bg-raised px-2 py-1 font-mono text-[11px] text-accent">
                    {pub.year}
                  </span>
                </div>
                <p className="mt-1.5 text-xs text-muted">{pub.venue}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{pub.abstract}</p>
                <p className="mt-3 text-xs leading-relaxed text-muted">
                  <span className="font-mono text-accent">contribution:</span> {pub.contribution}
                </p>
                <div className="mt-auto flex items-center justify-between gap-3 pt-4">
                  <div className="flex flex-wrap gap-1.5">
                    {pub.technologies.map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-line bg-raised px-2 py-0.5 font-mono text-[10px] text-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <a
                    href={pub.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center gap-1.5 text-xs font-medium text-accent transition-colors hover:text-foreground"
                  >
                    Read Paper
                    <ExternalLink size={12} aria-hidden />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <h3 className="mb-5 mt-14 text-sm font-semibold uppercase tracking-widest text-muted">
            Certifications
          </h3>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {certifications.map((cert) => (
              <li key={cert.id}>
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full items-start gap-3 rounded-xl border border-line bg-surface p-4 transition-colors hover:border-line-bright"
                >
                  <span className="mt-0.5 text-accent">
                    <Award size={16} aria-hidden />
                  </span>
                  <span>
                    <span className="block text-sm font-medium leading-snug group-hover:text-accent">
                      {cert.title}
                    </span>
                    <span className="mt-0.5 block text-xs text-muted">
                      {cert.issuer} · {cert.issued}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
