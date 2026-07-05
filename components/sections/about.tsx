import Image from "next/image";
import { LinkedinIcon } from "@/components/ui/brand-icons";
import { profile } from "@/data/profile";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

export function About() {
  const { about, testimonial } = profile;

  return (
    <section id="about" className="scroll-mt-20 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading index="01" title="About" subtitle={about.intro} />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[280px_1fr]">
          <Reveal>
            <div className="space-y-5">
              <div className="relative aspect-square w-56 overflow-hidden rounded-xl border border-line">
                <Image
                  src={profile.photo}
                  alt={`Portrait of ${profile.name}`}
                  fill
                  sizes="224px"
                  className="object-cover"
                />
              </div>
              <div className="rounded-xl border border-line bg-surface p-4 font-mono text-xs leading-relaxed text-muted">
                <p>
                  <span className="text-accent">location</span>: &quot;{profile.location}&quot;
                </p>
                <p>
                  <span className="text-accent">role</span>: &quot;SDE @ GlobalLogic&quot;
                </p>
                <p>
                  <span className="text-accent">status</span>:{" "}
                  <span className="text-emerald-400">&quot;open_to_work&quot;</span>
                </p>
              </div>
            </div>
          </Reveal>

          <div className="space-y-10">
            <Reveal delay={0.08}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {about.highlights.map((h) => (
                  <div
                    key={h.label}
                    className="rounded-xl border border-line bg-surface p-5 transition-colors hover:border-line-bright"
                  >
                    <p className="font-mono text-xs uppercase tracking-widest text-accent">
                      {h.label}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{h.text}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                <div>
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-muted">
                    Interests
                  </h3>
                  <ul className="space-y-2">
                    {about.interests.map((i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <span className="text-accent" aria-hidden>
                          ▹
                        </span>
                        {i}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 text-sm leading-relaxed text-muted">{about.focus}</p>
                </div>
                <div>
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-muted">
                    Timeline
                  </h3>
                  <ol className="relative space-y-4 border-l border-line pl-5">
                    {about.timeline.map((t) => (
                      <li key={t.year} className="relative">
                        <span
                          className="absolute -left-[23px] top-1.5 h-1.5 w-1.5 rounded-full bg-accent"
                          aria-hidden
                        />
                        <p className="font-mono text-xs text-accent">{t.year}</p>
                        <p className="mt-0.5 text-sm text-muted">{t.event}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <figure className="rounded-xl border border-line bg-surface p-6">
                <blockquote className="text-sm leading-relaxed text-muted">
                  “{testimonial.quote}”
                </blockquote>
                <figcaption className="mt-4 flex items-center gap-3">
                  <Image
                    src={testimonial.image}
                    alt=""
                    width={40}
                    height={40}
                    className="rounded-full border border-line object-cover"
                  />
                  <div>
                    <p className="text-sm font-medium">{testimonial.author}</p>
                    <p className="text-xs text-muted">{testimonial.title}</p>
                  </div>
                  <a
                    href={testimonial.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${testimonial.author} on LinkedIn`}
                    className="ml-auto text-muted transition-colors hover:text-accent"
                  >
                    <LinkedinIcon size={16} />
                  </a>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
