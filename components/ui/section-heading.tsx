import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  index: string;
  title: string;
  subtitle?: string;
  eyebrow?: string;
  className?: string;
}

/** Numbered section header in the style of an annotated spec document. */
export function SectionHeading({ index, title, subtitle, eyebrow, className }: SectionHeadingProps) {
  return (
    <div className={cn("mb-12 grid gap-5 border-t border-line pt-5 md:grid-cols-[1fr_2fr]", className)}>
      <p className="font-mono text-xs uppercase tracking-[.22em] text-accent" aria-hidden>
        {index} <span className="mx-2 text-muted">✦</span> {eyebrow ?? "Portfolio chapter"}
      </p>
      <div>
        <h2 className="display-type text-5xl leading-[.92] tracking-[-.04em] sm:text-7xl">{title}</h2>
        {subtitle ? <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">{subtitle}</p> : null}
      </div>
    </div>
  );
}
