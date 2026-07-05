import { skillCategories } from "@/data/skills";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-20 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          index="04"
          title="Technical Skills"
          subtitle="The stack I build, test, and ship with — organized by what I do with it."
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {skillCategories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <Reveal key={cat.id} delay={Math.min(i * 0.04, 0.2)}>
                <div className="flex h-full flex-col rounded-xl border border-line bg-surface p-5 transition-colors hover:border-line-bright">
                  <div className="mb-3 flex items-center gap-2.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-md border border-line bg-raised text-accent">
                      <Icon size={15} aria-hidden />
                    </span>
                    <h3 className="text-sm font-semibold">{cat.title}</h3>
                  </div>
                  <p className="mb-4 text-xs leading-relaxed text-muted">{cat.description}</p>
                  <ul className="mt-auto flex flex-wrap gap-1.5">
                    {cat.skills.map((s) => (
                      <li
                        key={s}
                        className="rounded-md border border-line bg-raised px-2 py-1 font-mono text-[11px] text-muted transition-colors hover:border-accent hover:text-foreground"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
